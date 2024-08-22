import styles from "./LoginScreen.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function LoginScreen() {
  const navigation = useNavigate();
  const { dispatch, login, isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (isAuthenticated) navigation("/app", { replace: true });
    },
    [navigation, isAuthenticated]
  );
  return (
    <div className={styles.loginContainer}>
      <h3>GİRİŞ YAP</h3>

      <form action="POST" className={styles.form} onSubmit={login}>
        <div className={styles.formItem}>
          {/* <label htmlFor="username">Kullanıcı Adı:</label> */}
          <input
            onChange={(e) =>
              dispatch({ type: "username", payload: e.target.value })
            }
            type="text"
            htmlFor="username"
            placeholder="Kullanıcı Adınız"
          />
        </div>
        <div className={styles.formItem}>
          {/* <label htmlFor="psw">Şifre:</label> */}
          <input
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
            type="password"
            htmlFor="psw"
            placeholder="Şifreniz"
          />
        </div>

        <button className={styles.loginButton}>Giriş Yap</button>
      </form>
      <button
        className={styles.closeButton}
        onClick={() => dispatch({ type: "loginScreenClose" })}
      >
        X
      </button>
      <div className={styles.signUpButtonContainer}>
        <p>Veya</p>
        <button
          className={styles.signUpButton}
          onClick={() => dispatch({ type: "signUpOpen" })}
        >
          Kaydol
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
