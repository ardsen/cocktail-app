import styles from "./Header.module.css";

function Logo() {
  return (
    <figure className={styles.logoContainer}>
      <img src="/cocktail-logo.png" alt="logo" />
    </figure>
  );
}

export default Logo;
