import MobileAudioMiniPlayer from "@/components/ui/player/MobileAudioMiniPlayer/MobileAudioMiniPlayer";
import styles from "./PageLayout.module.scss";
import { useRoomPlayback } from "@playback";

interface PageLayoutProps {
    header?: React.ReactNode;
    children: React.ReactNode;
}

/**
 * PageLayout if layout for simple pages with header to keep same style
 * 
 * @param title is string title for page
 * @param children is page content
 */
const PageLayout = ({ header, children }: PageLayoutProps) => {

    const { roomLoaded } = useRoomPlayback();

    return (
        <div className={styles.layout}>
            {header && <h2 className={styles.header}>{header}</h2>}

            <div className={styles.page}>
                {children}

                {roomLoaded && <MobileAudioMiniPlayer />}
            </div>
        </div>
    );
};

export default PageLayout;