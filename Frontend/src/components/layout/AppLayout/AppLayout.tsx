import AudioPlayer from "@/components/ui/player/AudioPlayer/AudioPlayer";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss"
import Header from "../navigation/Header/Header";
import MobileNav from "../navigation/MobileNav/MobileNav";
import RoomReturnModal from "@/components/modals/RoomReturnModal/RoomReturnModal";
import clsx from "clsx";
import { useAuth } from "@user";
import { useEffect, useState } from "react";
import { useWebSocket } from "@websocket";
import DesktopAudioPlayer from "@/components/ui/player/DesktopAudioPlayer/DesktopAudioPlayer";

/**
 * AppLayout is layout for the entire application to keep same style
 */
const AppLayout = () => {

    const [started, setStarted] = useState<boolean>(false);
    const { user, loading } = useAuth();
    const { isReady } = useWebSocket();
    const [loadingPercent, setLoadingPercent] = useState<number>(0);

    useEffect(() => {
        const target = (user && !loading ? 50 : 0) + (isReady ? 50 : 0);

        const interval = setInterval(() => {
            setLoadingPercent((prev) => {
                if (prev >= target) {
                    clearInterval(interval);
                    return prev;
                }

                return prev + 1;
            });
        }, 10);

        return () => clearInterval(interval);
    }, [user, loading, isReady]);

    useEffect(() => {
        if (loadingPercent === 100) {
            setTimeout(() => {
                setStarted(true)
            }, 300)
        }
    }, [loadingPercent])

    return (
        <>
            {started ? (
                <div className={styles.content}>
                    <Header/>

                    <main className={styles.main}>
                        <Outlet />
                    </main>

                    <AudioPlayer />

                    <MobileNav />

                    <DesktopAudioPlayer />

                    {/* <RoomReturnModal /> */}
                </div>
            ) : (
                <div className={styles.loadingWrapper}>
                    <div className={styles.loadingContent}>
                        <div className={styles.musicVisualizer}>
                            {Array.from({ length: 9 }, (_, i) => (
                                <span key={i} />
                            ))}
                        </div>

                        <span className={styles.loadingText}>
                            Loading music... {loadingPercent}%
                        </span>

                        <div className={styles.loading}>
                            <div
                                className={styles.progress}
                                style={{ width: `${Math.min(100, Math.max(0, loadingPercent))}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AppLayout;