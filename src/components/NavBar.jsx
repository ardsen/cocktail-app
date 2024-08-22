import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Header.module.css";

function NavBar() {
  const navigate = useNavigate();
  const { dispatch, isAuthenticated } = useAuth();
  function login() {
    dispatch({ type: "loginScreenOpen" });
  }
  function logout() {
    navigate("/");
    dispatch({ type: "logout" });
  }
  return (
    <ul className={styles.navbar}>
      {!isAuthenticated && (
        <>
          {" "}
          <li>Anasayfa</li>
          <li>Hakkında</li>
        </>
      )}

      <li className={styles.login} onClick={isAuthenticated ? logout : login}>
        {isAuthenticated ? "Çıkış Yap" : "Giriş Yap / Kaydol"}
      </li>
    </ul>
  );
}

export default NavBar;
