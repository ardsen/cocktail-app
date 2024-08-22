import styles from "./ManuelLayout.module.css";
import ManuelSecondItem from "./ManuelSecondItem";

function ManuelSecondOptions() {
  const arr = ["Limon", "Şeker", "Bitter", "Soda", "Vanilya"];

  return (
    <div style={{ color: "white" }} className={styles.secondOptionsContainer}>
      <ul>
        <h4>İkincil Malzeme</h4>
        {arr.map((opt) => (
          <ManuelSecondItem key={opt} opt={opt} />
        ))}
      </ul>
    </div>
  );
}

export default ManuelSecondOptions;
