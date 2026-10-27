import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss"
import { useAuth } from "@user";
import { PlaylistIcon, DoorIcon, LibraryIcon, UserIcon, HomeIcon } from "@/assets/icons";
import { useData, useGlobal } from "@common";
import { ReactNode } from "react";
import clsx from "clsx";

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

/**
 * Header is the layout component that contains navigation
 */
const Header = () => {

    const { user, isAuthenticated } = useAuth();
    const { roomData } = useData();
    const { isMobile } = useGlobal();
    const navigate = useNavigate();

    /**
     * disabling on mobile displays
     */
    if (isMobile) return null;

    const links: INavigationLink[] = [
        { to: "/app", icon: <HomeIcon className={styles.linkIcon} />, title: "Home" },
        { to: "/app/room", icon: <DoorIcon className={styles.linkIcon} />, title: "Room", condition: !!roomData.room },
        { to: "/app/library", icon: <LibraryIcon className={styles.linkIcon} />, title: "Library", condition: isAuthenticated },
        { to: "/app/playlists", icon: <PlaylistIcon className={styles.linkIcon} />, title: "Playlists", condition: isAuthenticated },
    ]
    
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img className={styles.logo} src="/image/logo.png" onClick={() => navigate("/")}/>
                <div className={styles.navigation}>
                    {links.map(l => <NavigationLink key={l.title} link={l} />)}
                </div>
                {isAuthenticated ? (
                    <Link to="/app/profile" className={styles.auth}>
                        <UserIcon className={styles.icon}/>
                        <span className={styles.userName}>{user?.name}</span>
                    </Link>
                ) : (
                    <Link to="/login">Sign In</Link>
                )}
            </div>
        </header>
    )
}

/**
 *  NavigationLink is conponent to display navigation links
 */
const NavigationLink = ({ link }: { link: INavigationLink }) => {
    const location = useLocation();
    const isActive = link.to == location.pathname;

    return (link.condition ?? true) && (
        <NavLink to={link.to} className={clsx(styles.link, isActive && styles.active)}>
            {link.icon}
            <span className={styles.subtitle}>{link.title}</span>
        </NavLink>
    )
}

export default Header;