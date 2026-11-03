import { Link, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss"
import Logo from "@/components/ui/Logo/Logo";

const navigation = [
    { label: "Features", href: "#features" },
    { label: "Listening rooms", href: "#rooms" },
    { label: "How it works", href: "#how-it-works" },
];

/**
 * MainLayout is layout for the entire application to keep same style
 */
const MainLayout = () => {

    return (
        <>
            <header className={styles.header}>
                <Logo />

                <nav className={styles.navigation} aria-label="Main navigation">
                    {navigation.map((item) => (
                        <a key={item.href} href={item.href}>
                            {item.label}
                        </a>
                    ))}
                </nav>

                <Link to="/app" className={styles.headerButton}>
                    Open app
                    <span aria-hidden="true">↗</span>
                </Link>
            </header>

            <Outlet />
        </>
    )
}

export default MainLayout;