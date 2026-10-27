import { NavLink } from "react-router-dom";
import styles from "./MobileNav.module.scss"
import { useRoomPlayback } from "@playback";
import { useAuth } from "@user";
import { PlaylistIcon, DoorIcon, LibraryIcon, HomeIcon, UserIcon } from "@/assets/icons";

import { ReactNode } from "react";
import { useData, useGlobal } from "@common";


/**
 * interface for NavigationLink conponents
 * 
 * @param to link url
 * @param icon react-svg icon from local pack
 * @param title link title
 * @param condition condition to display link
 */
interface INavigationLink {
    to: string,
    icon: ReactNode,
    title: string,
    condition?: boolean
}

const MobileNav = () => {

    const { isMobile } = useGlobal();
    const { roomData } = useData();

    /**
     * disabling on not mobile displays
     */
    if (!isMobile) return null;

    const links: INavigationLink[] = [
        { to: "/", icon: <HomeIcon className={styles.linkIcon} />, title: "Home" },
        { to: "/app/room", icon: <DoorIcon className={styles.linkIcon} />, title: "Room", condition: !!roomData.room },
        { to: "/app/library", icon: <LibraryIcon className={styles.linkIcon} />, title: "Library" },
        { to: "/app/playlists", icon: <PlaylistIcon className={styles.linkIcon} />, title: "Playlists" },
        { to: "/app/profile", icon: <UserIcon className={styles.linkIcon} />, title: "Profile" },
    ]

    return (
        <nav className={styles.nav}>
            {links.map(l => <NavigationLink key={l.title} link={l} />)}
        </nav>
    );
}


/**
 *  NavigationLink is conponent to display navigation links
 */
const NavigationLink = ({ link }: { link: INavigationLink }) => {
    return (link.condition ?? true) && (
        <NavLink to={link.to} className={styles.link}>
            {link.icon}
            <span className={styles.subtitle}>{link.title}</span>
        </NavLink>
    );
}

export default MobileNav;