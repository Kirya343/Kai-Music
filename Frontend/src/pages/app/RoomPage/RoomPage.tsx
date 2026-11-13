import { useState } from "react";
import { IRoomUpdate, roomService } from "@room";
import styles from "./RoomPage.module.scss";
import AudioMiniPlayer from "@/components/ui/player/MobileAudioMiniPlayer/MobileAudioMiniPlayer";
import { useGlobal } from "@common";
import { useWebSocket } from "@websocket";
import KebabMenu from "@/components/ui/KebabMenu/KebabMenu";
import { CheckBoxIcon, PlusIcon, ShuffleIcon } from "@/assets/icons";
import Loader from "@/components/ui/Loader/Loader";
import { playlistService } from "@playlist";
import TrackImportModal from "@/components/modals/TrackImportModal/TrackImportModal";
import PlaybackQueueTrack from "@/components/ui/track/PlaybackQueueTrack";
import { loggerFactory } from "@common";
import SelectableList from "@/components/ui/SelectableList/SelectableList";
import AvatarStack from "@/components/ui/AvatarStack/AvatarStack";
import { usePlaybackData, usePlaybackPlaylist, usePlaybackState } from "@playback";

const logger = loggerFactory.getLogger("Pages.Room");

const RoomPage = () => {
    const [selectMode, setSelectMode] = useState<boolean>(false);

    const { playbackState } = usePlaybackState();
    const { playbackPlaylist } = usePlaybackPlaylist();
    const playbackData = usePlaybackData();

    const room = playbackData.room

    const { started } = useGlobal();
    const { error } = useWebSocket();
    const [newRoomName, setNewRoomName] = useState<string>(room?.title || "");
    const [editMode, setEditMode] = useState<boolean>(false);

    const [importOpen, setImportOpen] = useState<boolean>(false)

    const deleteFromPlaylist = (ids: number[]) => {
        
        if (!playbackPlaylist?.id) return;

        playlistService.removeFromQueue(playbackPlaylist.id, ids)
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
                            <AvatarStack users={playbackData?.listeners || []} />
                            {playbackData?.listeners?.length || 0} Listners
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
                                    },
                                    {
                                        icon: <ShuffleIcon />,
                                        title: "Add rundom",
                                        func: async () => {
                                            if (playbackPlaylist) await playlistService.addRandomTracks(playbackPlaylist.id, 30)
                                        }
                                    }
                                ]}
                            />
                        </div>

                        <SelectableList
                            className={styles.trackList}
                            data={Object.fromEntries(
                                (playbackPlaylist?.queue ?? [])
                                    .slice()
                                    .sort((a, b) => a.position - b.position)
                                    .map(qi => [
                                        qi.id,
                                        <PlaybackQueueTrack
                                            key={qi.id}
                                            queueItem={qi}
                                            playing={playbackState?.entryId === qi.id}
                                        />
                                    ])
                            )}
                            extraActions={[
                                {
                                    title: "Remove from queue",
                                    func: async (ids) => await deleteFromPlaylist(ids),
                                    influence: "selected"
                                }
                            ]}
                            selectMode={selectMode}
                            setSelectMode={setSelectMode}
                            trackedItem={playbackState?.entryId}
                            initialVisible={"all"}
                        />

                        <button 
                            className={styles.addTrack} 
                            onClick={() => setImportOpen(true)}
                        >
                            Add track
                        </button>
                    </div>
                </Loader>

                {started && <AudioMiniPlayer />}
            </div>

            {playbackPlaylist && <TrackImportModal importPlaylist={playbackPlaylist} isOpen={importOpen} onClose={() => setImportOpen(false)} />}
        </>
    )
}

export default RoomPage;