import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss"

const HomePage = () => {
    return (
        <div className={styles.page}>
            <Link to={"/app"} className={styles.link}>I NEED MUSIC</Link>
        </div>
    )
}

export default HomePage;