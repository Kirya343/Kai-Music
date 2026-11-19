import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./MainPage.module.scss";
import { IListeningRoom, roomService } from "@room";
import {
    UserGroupIcon,
    DiscIcon,
} from "@/assets/icons";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import { loggerFactory } from "@common";
import { Artwork } from "@/components/ui/Artwork/Artwork";
import MainPageSidebar from "./MainPageSidebar/MainPageSidebar";
import MainPageContent from "./MainPageContent/MainPageContent";

const logger = loggerFactory.getLogger("Pages.Main");

function formatListeners(count: number): string {
    return `${count} ${count === 1 ? "person" : "people"}`;
}

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