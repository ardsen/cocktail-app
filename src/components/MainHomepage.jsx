import styles from "./MainHomepage.module.css";
import LoginScreen from "./LoginScreen";
import Overlay from "./Overlay";
import { useAuth } from "../contexts/AuthContext";
import SignUpScreen from "./SignUpScreen";

function MainHomepage() {
  const { isLoginScreenOpen, dispatch, isSignUpScreenOpen } = useAuth();

  return (
    <main className={styles.mainHomepage}>
      <div className={styles.mainGrid}>
        <div className={styles.mainShadow}></div>
        <div className={styles.topic}>
          <h1>Kokteyl Dünyası</h1>
        </div>
        <div className={styles.slogan}>
          <p>Her Damak Tadına Uygun Bir Kokteyl...</p>
        </div>
        <div className={styles.toLogin}>
          <div className={styles.toLoginContainer}>
            <p>Yepyeni Lezzetler Keşfetmek İçin</p>
            <img src="/arrow.png" alt="" />
          </div>
        </div>
        <button
          className={styles.loginButton}
          onClick={() => dispatch({ type: "loginScreenOpen" })}
        >
          GİRİŞ YAP
          <div className={styles.icon}>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      {isLoginScreenOpen && <LoginScreen />}
      {isSignUpScreenOpen && <SignUpScreen />}
      {(isLoginScreenOpen || isSignUpScreenOpen) && <Overlay />}
    </main>
  );
}

export default MainHomepage;
