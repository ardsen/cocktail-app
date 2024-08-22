import styles from "./Header.module.css";
import Logo from "./Logo";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <NavBar />
    </header>
  );
}

export default Header;
