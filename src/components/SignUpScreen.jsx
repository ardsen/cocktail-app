import styles from "./LoginScreen.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

function SignUpScreen() {
  const { dispatch, signUpPassword, signUp, signedUp } = useAuth();
  const [rePassword, setRePassword] = useState("");
  const isPasswordsMatch = rePassword === signUpPassword;
  return (
    <div className={styles.loginContainer}>
      <h3>KAYDOL</h3>
      <form action="" className={styles.form} onSubmit={signUp}>
        <div className={styles.formItem}>
          {/* <label htmlFor="username">Kullanıcı Adı:</label> */}
          <input
            onChange={(e) => {
              dispatch({
                type: "signUpUsernameValue",
                payload: e.target.value,
              });
            }}
            type="text"
            htmlFor="usernameSignUp"
            placeholder="Kullanıcı Adı Oluşturun"
            required
            minLength={4}
          />
        </div>
        <div className={styles.formItem}>
          {/* <label htmlFor="psw">Şifre:</label> */}
          <input
            onChange={(e) =>
              dispatch({ type: "signUpPasswordValue", payload: e.target.value })
            }
            type="password"
            htmlFor="pswSignUp"
            placeholder="Şifre Oluşturun"
            required
            minLength={4}
          />
        </div>
        <div className={styles.formItem}>
          {/* <label htmlFor="psw">Şifre:</label> */}
          <input
            onChange={(e) => setRePassword(e.target.value)}
            type="password"
            htmlFor="pswSignUp"
            placeholder="Şifrenizi Onaylayın"
            required
            minLength={4}
          />
          {!isPasswordsMatch && (
            <span className={styles.passwordsMatchAlert}>
              ❌Şifreler uyuşmuyor
            </span>
          )}
        </div>

        <button className={styles.loginButton}>Kaydol</button>
        {signedUp && (
          <div className={styles.timerContainer}>
            <div className={styles.timer}></div>
            <p>Kayıt Başarılı...✅</p>
          </div>
        )}
      </form>
      <button
        className={styles.closeButton}
        onClick={() => dispatch({ type: "signUpClose" })}
      >
        X
      </button>
      <div className={styles.signUpButtonContainer}>
        <p>Veya</p>
        <button
          className={styles.signUpButton}
          onClick={() => dispatch({ type: "loginScreenOpen" })}
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

export default SignUpScreen;
