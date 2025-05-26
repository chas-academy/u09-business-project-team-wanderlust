import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.navList}>
                    <li><Link to="/profil" className={styles.link}>Profil</Link></li>
                    <li><Link to="/" className={styles.link}>Start sida</Link></li>
                    <li><Link to="/compare" className={styles.link}>Jämför länder</Link></li>

                </ul>
            </nav>
        </header>
    );
};