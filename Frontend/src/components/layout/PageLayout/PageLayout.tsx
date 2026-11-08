import MobileAudioMiniPlayer from "@/components/ui/player/MobileAudioMiniPlayer/MobileAudioMiniPlayer";
import styles from "./PageLayout.module.scss";
import { useData } from "@common";

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

    const { roomData } = useData();

    return (
        <div className={styles.layout}>
            {header && <div className={styles.header}>{header}</div>}

            <div className={styles.page}>
                {children}

                {roomData.room?.id && <MobileAudioMiniPlayer />}
            </div>
        </div>
    );
};

export default PageLayout;