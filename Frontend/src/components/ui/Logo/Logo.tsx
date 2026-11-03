import { Link } from "react-router-dom";
import styles from "./Logo.module.scss"

export default function Logo() {
    return (
        <Link to="/" className={styles.logo} aria-label="Kai Music home">
            <span className={styles.logoIcon}>K</span>
            <span>Kai Music</span>
        </Link>
    )
}