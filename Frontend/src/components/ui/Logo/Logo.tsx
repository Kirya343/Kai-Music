import { Link } from "react-router-dom";
import styles from "./Logo.module.scss"

export default function Logo() {
    return (
        <Link to="/app" className={styles.logo} aria-label="Kai Music home">
            <img className={styles.logoIcon} src="/image/logo.svg"/>
            <span>Kai Music</span>
        </Link>
    )
}