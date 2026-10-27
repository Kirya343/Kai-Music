import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss"
import Header from "../navigation/Header/Header";

/**
 * MainLayout is layout for the entire application to keep same style
 */
const MainLayout = () => {

    return (
        <div className={styles.layout}>
            <Header/>

            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;