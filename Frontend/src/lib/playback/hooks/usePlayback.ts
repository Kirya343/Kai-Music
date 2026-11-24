import { countPosition, useGlobal } from "@common";
import { RefObject, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { PlaybackState, PlaybackMode, PlaybackData, PlaybackEventType } from "../playback.types";
import { useWebSocket } from "@websocket";
import { playbackService } from "../services";
import { loggerFactory } from "@common";
import { Playlist } from "@playlist";
import { Client } from "@stomp/stompjs";
import { IAudio } from "@audio";
import { useNavigate } from "react-router-dom";
import PlaybackController from "../audio/PlaybackController";

const logger = loggerFactory.getLogger("Audio.Playback");

export const usePlayback = () => {

    const [playbackPlaylist, setPlaybackPlaylist] = useState<Playlist | null>(() => {
        const saved = localStorage.getItem("playback.playlist");

        return saved ? JSON.parse(saved) : null;
    });

    const { addOnConnectHandler } = useWebSocket();

    const unsyncedStateRef = useRef<PlaybackState | null>(null);
    const awaitingStateRef = useRef(false);
    const prevPlaybackStateRef = useRef<PlaybackState | null>(null);
    const currentStreamIdRef = useRef<string | null>(null)

    // state to increase the fastmutable position 
    const positionRef = useRef<number>(0);
    const [autoPlay, setAutoPlay] = useState<boolean>(false);

    const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(PlaybackMode.NORMAL);
    const [playbackData, setPlaybackData] = useState<PlaybackData>({})
    const [playingAudio, setPlayingAudio] = useState<IAudio | null>(null);

    const [controller, setController] = useState<PlaybackController | null>(null);

    useEffect(() => {
        const instance = new PlaybackController(() => setAutoPlay(false));

        setController(instance);

        return () => {
            instance.cleanup();
        };
    }, []);

    const playbackState = useSyncExternalStore(
        controller?.subscribeState ?? (() => () => {}),
        controller?.getState ?? (() => null)
    );

    const position = useSyncExternalStore(
        controller?.subscribePosition ?? (() => () => {}),
        controller?.getPosition ?? (() => 0)
    );

    const currentPlaybackState = useMemo(() => {
        if (!playbackState) return null;

        return {
            ...playbackState,
            position
        };
    }, [playbackState, position]);

    const navigate = useNavigate();

    useEffect(() => {

        logger.debug(
            "Попытка найти аудио из плейлиста", 
            playbackState?.entryId,
            playbackPlaylist?.queue
        )

        const audio = playbackPlaylist?.queue.find(
            qi => qi.id === playbackState?.entryId
        )?.audio;

        if (audio) {
            setPlayingAudio(audio);
        }
    }, [playbackPlaylist, playbackState]);

    // info
    const updateMessage = useMemo<string>(() => {
        if (!playbackState || !prevPlaybackStateRef.current) return "";

        const newState = playbackState;
        const prevState = prevPlaybackStateRef.current;

        let message = `${newState.user} `

        if (newState.entryId != prevState.entryId) {
            message += `started playing track #${newState.entryId}`;
        } else if (newState.pause != prevState.pause && newState.pause) {
            message += `paused the playback`
        } else if (newState.pause != prevState.pause && !newState.pause) {
            message += `resumed playback`
        } else if (newState.position != prevState.position) {
            message += `seeked to ${countPosition(newState.position)}`
        }

        prevPlaybackStateRef.current = playbackState

        return message;
    }, [playbackState]);

    const reconnect = useCallback((stompClient: Client | null) => {

        if (!stompClient) return;

        logger.debug("переподключаемся к комнате")

        stompClient.publish({
            destination: "/app/playback.reconnect",
            body: ""
        });
    }, []);

    const resync = useCallback((stompClient: Client | null, autoPlay: boolean) => {

        if (!stompClient) return;

        logger.debug("перезагружаем состояние")

        awaitingStateRef.current = true;

        setAutoPlay(autoPlay)

        stompClient.publish({
            destination: "/app/playback.resync",
            body: ""
        });
    }, []);

    const handleEvent = useCallback((event: PlaybackEventType) => {
        switch (event) {
            case "UNSUBSCRIBED":
                
                controller?.pausePlayback()

                setPlaybackData({})
                controller?.setPlaybackState(null)
                setPlaybackPlaylist(null)
                setPlayingAudio(null)

                if (window.location.pathname == "/app/room"){
                    navigate("/app")
                }
                break;
        
            default:
                break;
        }
    }, [controller])

    useEffect(() => {
        const unsubscribe = addOnConnectHandler((client) => {

            const playbackSub = client.subscribe(`/user/queue/playback.state`, (message) => {
                const state: PlaybackState = JSON.parse(message.body);

                const streamId = message.headers["stream-id"];

                logger.debug("Пришло обновление playback.state: ", state, streamId)

                if (currentStreamIdRef.current !== streamId) {
                    controller?.startNewStream(streamId);
                }

                awaitingStateRef.current = false;

                controller?.setPlaybackState(state);

                positionRef.current = state.position;

                unsyncedStateRef.current = state;

                controller?.playIfBuffered();
            });

            const playbackModeSub = client.subscribe(`/user/queue/playback.mode`, (message) => {
                const mode = JSON.parse(message.body);

                logger.debug("Пришло обновление playback.mode: ", mode)

                setPlaybackMode(mode);
            });

            const playbackPlaylistSub = client.subscribe(`/user/queue/playback.playlist`, (message) => {
                const playlist = JSON.parse(message.body);

                logger.debug("Пришло обновление playback.playlist: ", playlist)

                setPlaybackPlaylist(playlist);
            });

            const playbackDataSub = client.subscribe(`/user/queue/playback.data`, (message) => {
                const playbackData = JSON.parse(message.body);

                logger.debug("Пришло обновление playback.data: ", playbackData)

                setPlaybackData(playbackData);
            });

            const playbackEventSub = client.subscribe(`/user/queue/playback.event`, (message) => {
                const playbackEvent = JSON.parse(message.body);

                logger.debug("Пришло обновление playback.event: ", playbackEvent.type)

                handleEvent(playbackEvent.type)
            });

            logger.debug("Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event")

            reconnect(client);

            return () => {
                playbackPlaylistSub.unsubscribe();
                playbackModeSub.unsubscribe();
                playbackSub.unsubscribe();
                playbackDataSub.unsubscribe();
                playbackEventSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);

    return {
        audio: controller?.getAudio(),
        pausePlayback: () => controller?.pausePlayback(),
        resumePlayback: () => controller?.resumePlayback(),
        currentPlaybackState,
        playbackState,
        playbackMode,
        playbackPlaylist,
        playbackData,
        playingAudio,
        updateMessage,
        togglePlay: () => controller?.togglePlay(),
        seek: (position: number) => controller?.seek(position),
        changeTrack: (changing: "next" | "prev" | number) => controller?.changeTrack(changing),
        reconnectPlayback: reconnect,
        resyncPlayback: resync,
        autoPlay,
        setAutoPlay
    }
}