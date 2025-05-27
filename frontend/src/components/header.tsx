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
    <header className="header">
      <nav>
        <ul className="navList">
          <li><Link to="/">Hem</Link></li>
          <li><Link to="/profil">Profil</Link></li>
          <li><Link to="/compare">Jämför Länder</Link></li>
          {!user ? (
            <li><Link to="/login">Logga in</Link></li>
          ) : (
            <li><button onClick={handleLogout}>Logga ut</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};