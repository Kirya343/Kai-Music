import { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import { IListeningRoom, roomService } from "@room";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import { loggerFactory } from "@common";
import MainPageContent from "./MainPageContent/MainPageContent";

const logger = loggerFactory.getLogger("Pages.Main");

const MainPage = () => {
    const [rooms, setRooms] = useState<IListeningRoom[] | null>(null);
    const [stat, setStat] = useState<{ activeListners: number; activeRooms: number } | null>(null);

    useEffect(() => {
        async function loadPage() {
            try {
                const res = await roomService.getRoomsPage();
                setRooms(res.data.publicRooms);
                setStat({
                    activeListners: res.data.activeListners,
                    activeRooms: res.data.activeRooms,
                });
            } catch (e) {
                logger.error(e);
                setRooms([]);
            }
        }

        loadPage();
    }, []);

    return (
        <PageLayout>
            <div className={styles.layout}>
                {/* Основная левая часть */}
                <MainPageContent stat={stat}/>
                
            </div>
        </PageLayout>
    );
};

export default MainPage;