import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <h3>Loading</h3>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;
