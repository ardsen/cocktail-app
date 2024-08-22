import styles from "./AppHome.module.css";

function AppHome() {
  return (
    <div className={styles.homeContainer}>
      <p className={styles.firstParagraph}>
        Onlarca tarif arasından&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </p>
      <img src="/first-cocktail.png" alt="" className={styles.firstImg} />
      <p className={styles.secondParagraph}>
        Damak tadınıza uygun olanı bulun...
      </p>
      <img src="/second-cocktail.png" alt="" className={styles.secondImg} />
    </div>
  );
}

export default AppHome;
