import { useState } from "react";
import { IRoomUpdate, roomService } from "@room";
import styles from "./RoomPage.module.scss";
import AudioMiniPlayer from "@/components/ui/player/MobileAudioMiniPlayer/MobileAudioMiniPlayer";
import { useData, useGlobal } from "@common";
import { useWebSocket } from "@websocket";
import KebabMenu from "@/components/ui/KebabMenu/KebabMenu";
import { CheckBoxIcon, PlusIcon } from "@/assets/icons";
import Loader from "@/components/ui/Loader/Loader";
import { playlistService } from "@playlist";
import TrackImportModal from "@/components/modals/TrackImportModal/TrackImportModal";
import RoomTrack from "@/components/ui/track/RoomTrack";
import { useRoomPlayback } from "@playback";
import { Navigate } from "react-router-dom";
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Pages.Room");

const RoomPage = () => {
    const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const { playbackState } = useRoomPlayback();
    const { room, playlist } = useData().roomData;

    const { started } = useGlobal();
    const { error } = useWebSocket();
    const [newRoomName, setNewRoomName] = useState<string>(room?.title || "");
    const [editMode, setEditMode] = useState<boolean>(false);

    const [importOpen, setImportOpen] = useState<boolean>(false)

    const toggleTrack = (id: number) => {
        setSelectedTracks(prev =>
            prev?.includes(id)
                ? prev.filter(trackId => trackId !== id)
                : [...prev, id]
        );
    };

    const deleteFromRoom = async () => {
        if (!playlist?.id) return;

        for (const trackId of selectedTracks) {
            setSelectedTracks(prev => prev.filter(id => id !== trackId))
        }

        await playlistService.removeFromQueue(playlist?.id, selectedTracks)
    }

    const saveRoom = async () => {
        if (!room) return;
        const roomUpdate: IRoomUpdate = {
            title: newRoomName
        }

        try {
            await roomService.updateRoom(room.id, roomUpdate);
            setEditMode(false)
        } catch (e) {
            logger.error(e)
        }
    }

    if (!room) {
        return <Navigate to={"/app"}/>
    }
    
    return (
        <>
            <div className={styles.page}>

                <Loader loadingActive={!room}>

                    <div className={styles.header}>
                        <div className={styles.title}>
                            <span>#{room?.id}</span>
                            {editMode ? (
                                <>  
                                    <input 
                                        className={styles.roomName}
                                        value={newRoomName} 
                                        onChange={(e) => setNewRoomName(e.target.value)} 
                                        placeholder={room?.title}
                                    />
                                    <button className={styles.submitBtn} onClick={saveRoom}>✔</button>
                                </>
                            ) : (
                                <span 
                                    onDoubleClick={() => setEditMode(true)}
                                    className={styles.roomName}
                                >
                                    {room?.title}
                                </span>
                            )}
                        </div>

                        <div className={styles.code}>
                            <span className={styles.roomName}>{room?.code || "Room code is unknown"}</span>
                        </div>

                        <div className={styles.members}>
                            {room?.listeners} Listners
                        </div>
                    </div>

                    {error && (<div className={styles.error}>Error while connecting to room</div>)}

                    <div className={styles.queue}>
                        <div className={styles.header}>
                            <h3>Playback queue</h3>
                            <KebabMenu
                                actions={[
                                    {
                                        icon: <CheckBoxIcon/>,
                                        title: "Select tracks",
                                        func: () => setSelectMode(prev => !prev)
                                    },
                                    {
                                        icon: <PlusIcon />,
                                        title: "Add tracks",
                                        func: () => setImportOpen(true)
                                    }
                                ]}
                            />
                        </div>

                        <div className={styles.trackList}>
                            {playlist?.queue.slice()
                                .sort((a, b) => a.position - b.position)
                                .map(qi => (
                                    <RoomTrack
                                        key={qi.id}
                                        queueItem={qi}
                                        selected={selectedTracks.some(t => t == qi.id)}
                                        selectMode={selectMode}
                                        toggleTrack={toggleTrack}
                                        playing={playbackState?.entryId === qi.id}
                                    />
                                ))
                            }
                        </div>

                        <button 
                            className={styles.addTrack} 
                            onClick={() => setImportOpen(true)}
                        >
                            Add track
                        </button>
                    </div>

                    {selectMode && (
                        <div className={styles.selectedTracksActions}>
                            <button 
                                onClick={deleteFromRoom}
                                className={styles.action}
                            >
                                Remove from queue
                            </button>
                            <button 
                                className={styles.action}
                                onClick={() => setSelectedTracks([])}
                            >
                                Clean selected
                            </button>
                            <button 
                                className={styles.action}
                                onClick={() =>  {
                                    setSelectMode(false)
                                    setSelectedTracks([])
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </Loader>

                {started && <AudioMiniPlayer />}
            </div>

            {playlist && <TrackImportModal importPlaylist={playlist} isOpen={importOpen} onClose={() => setImportOpen(false)} />}
        </>
    )
}

export default RoomPage;