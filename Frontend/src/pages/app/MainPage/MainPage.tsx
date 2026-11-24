import { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import { IListeningRoom, roomService } from "@room";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import { loggerFactory } from "@common";
import MainPageContent from "./MainPageContent/MainPageContent";

const logger = loggerFactory.getLogger("Pages.Main");

const MainPage = () => {
    const [stat, setStat] = useState<{ activeListners: number; activeRooms: number } | null>(null);

    useEffect(() => {
        async function loadPage() {
            try {
                const res = await roomService.getRoomsPage();
                setStat({
                    activeListners: res.data.activeListners,
                    activeRooms: res.data.activeRooms,
                });
            } catch (e) {
                logger.error(e);
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