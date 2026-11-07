import { useState } from "react";
import { IRoomUpdate, roomService } from "@room";
import styles from "./RoomPage.module.scss";
import AudioMiniPlayer from "@/components/ui/player/MobileAudioMiniPlayer/MobileAudioMiniPlayer";
import { getRandomPastelColor, useData, useGlobal } from "@common";
import { useWebSocket } from "@websocket";
import KebabMenu from "@/components/ui/KebabMenu/KebabMenu";
import { CheckBoxIcon, PlusIcon, ShuffleIcon } from "@/assets/icons";
import Loader from "@/components/ui/Loader/Loader";
import { playlistService } from "@playlist";
import TrackImportModal from "@/components/modals/TrackImportModal/TrackImportModal";
import RoomTrack from "@/components/ui/track/RoomTrack";
import { useRoomPlayback } from "@playback";
import { Navigate } from "react-router-dom";
import { loggerFactory } from "@common";
import SelectableList from "@/components/ui/SelectableList/SelectableList";

const logger = loggerFactory.getLogger("Pages.Room");

const RoomPage = () => {
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const { playbackState } = useRoomPlayback();
    const { room, playlist } = useData().roomData;

    const { started } = useGlobal();
    const { error } = useWebSocket();
    const [newRoomName, setNewRoomName] = useState<string>(room?.title || "");
    const [editMode, setEditMode] = useState<boolean>(false);

    const [importOpen, setImportOpen] = useState<boolean>(false)

    const deleteFromRoom = async (id: number) => {
        if (!playlist?.id) return;

        try {
            await playlistService.removeFromQueue(playlist?.id, [id])
        } finally {

        }
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

    console.log(room)
    
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
                            {/* <div className={styles.avatarStack}>
                                {room?.listeners?.map(listener => (
                                    <span style={{ backgroundColor: getRandomPastelColor() }}>
                                        {listener.name.charAt(0)}
                                    </span>
                                ))}
                            </div> */}
                            {room?.listeners?.length || 0} Listners
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
                                            if (playlist) await playlistService.addRandomTracks(playlist.id, 30)
                                        }
                                    }
                                ]}
                            />
                        </div>

                        <SelectableList
                            className={styles.trackList}
                            data={Object.fromEntries(
                                    (playlist?.queue ?? [])
                                        .slice()
                                        .sort((a, b) => a.position - b.position)
                                        .map(qi => [
                                            qi.id,
                                            <RoomTrack
                                                key={qi.id}
                                                queueItem={qi}
                                                playing={playbackState?.entryId === qi.id}
                                            />
                                        ])
                                )}
                            extraActions={[
                                {
                                    title: "Remove from queue",
                                    func: async (id: number) => await deleteFromRoom(id),
                                    influence: "selected"
                                }
                            ]}
                            selectMode={selectMode}
                            setSelectMode={setSelectMode}
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

            {playlist && <TrackImportModal importPlaylist={playlist} isOpen={importOpen} onClose={() => setImportOpen(false)} />}
        </>
    )
}

export default RoomPage;