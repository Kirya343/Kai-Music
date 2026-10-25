import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.scss"
import { useAuth } from "@user";

const ProfilePage = () => {

    const { user } = useAuth();

    return (
        <div className={styles.page}>
            Your name is {user?.name}

            <Link to={"/logout"} className="btn">Выйти из аккаунта</Link>
        </div>
    );
}

export default ProfilePage;