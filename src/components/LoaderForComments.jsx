import styles from "./LoaderForComments.module.css";
function LoaderForComments() {
  return (
    <div className={styles.loaderContainer}>
      <p>Loading...</p>
      <div className={styles.loader}></div>
    </div>
  );
}

export default LoaderForComments;
