import styles from "./MainPage.module.scss";
import { IListeningRoom, roomService } from "@room";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { 
    CirclePlusIcon, MusicNoteIcon,
    UserGroupIcon,
    DiscIcon, DoorIcon
} from "@/assets/icons";
import JoinRoomModal from "@/components/modals/JoinRoomModal/JoinRoomModal";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import { loggerFactory, useData } from "@common";

const logger = loggerFactory.getLogger("Pages.Main");

const MainPage = () => {

    const { roomData } = useData()

    const [rooms, setRooms] = useState<IListeningRoom[] | null>(null);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [stat, setStat] = useState<{activeListners: number, activeRooms: number} | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        async function loadPage() {
            const res = await roomService.getRoomsPage();
            setRooms(res.data.publicRooms)
            setStat({
                activeListners: res.data.activeListners,
                activeRooms: res.data.activeRooms
            })
        }

        loadPage()
    }, [])

    const createRoom = async () => {
        try {
            await roomService.createRoom();
            navigate("/app/room");
        } catch (e) {
            logger.error(e);
        }
    }

    const joinRoom = async (code: string) => {
        try {
            await roomService.joinRoom(code);
            roomData.syncRoom();
            navigate("/app/room");
        } catch (e) {
            logger.error(e);
        }
    }

    return (
        <PageLayout>
            <div className={styles.layout}>
                <div className={styles.page}>
                    <div className={styles.welcome}>
                        <h1>Welcome to Kai Music</h1>
                        <p>Kai Music connects friends through shared music experiences. Create rooms, listen together, and find new tracks with your community.</p>
                    </div>

                    <div className={styles.community}>
                        <h2>Community Buzz</h2>

                        <div className={styles.statItem}>
                            <UserGroupIcon className={styles.icon}/>
                            <span>Currently Listening: <br/><strong>{stat?.activeListners ? stat?.activeListners : 0} people</strong></span>
                        </div>

                        <div className={styles.statItem}>
                            <DiscIcon className={clsx(styles.icon, Number(stat?.activeRooms) > 0 && "spin")}/>

                            <span>Total Rooms Active: <br/><strong>{Number(stat?.activeRooms) || 0}</strong></span>
                        </div>
                    </div>
                </div>

                <div className={clsx(styles.box, styles.sidebar)}>

                    <section className={styles.actions}>
                        <button className={styles.actionBtn} onClick={createRoom}>
                            <CirclePlusIcon />
                            <span>Create New Room</span>
                        </button>

                        <button className={styles.actionBtn} onClick={() => setOpen(true)}>
                            <DoorIcon />
                            <span>Join a Room</span>
                        </button>
                    </section>
                    
                    <section className={styles.publicRooms}>
                        <h3>Public rooms to join</h3>

                        <div className={styles.roomsList}>

                            {rooms?.map(r => (
                                <div className={styles.room} key={r.id} onClick={() => joinRoom(r.code)}>
                                    
                                    <span className={styles.roomName}>{r.title}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <JoinRoomModal isOpen={isOpen} setOpen={setOpen}/>
        </PageLayout>
    )
}

export default MainPage;