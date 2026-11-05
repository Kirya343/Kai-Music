import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.scss"

const RootLayout = () => {
    return (
        <>
            <div className={styles.backgroundGlow} aria-hidden="true" />
            <Outlet />
        </>
    )
}

export default RootLayout;