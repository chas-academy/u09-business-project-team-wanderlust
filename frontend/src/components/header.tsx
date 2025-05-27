import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useUser } from "../features/auth/UserContext";

export const Header = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li><Link className={styles.link} to="/">Hem</Link></li>
          <li><Link className={styles.link} to="/profil">Profil</Link></li>
          <li><Link className={styles.link} to="/compare">Jämför Länder</Link></li>
          {!user ? (
            <li><Link className={styles.link} to="/login">Logga in</Link></li>
          ) : (
            <li><button onClick={handleLogout}>Logga ut</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};