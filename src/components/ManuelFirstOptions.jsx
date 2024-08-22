import { useCocktails } from "../contexts/CocktailsContext";
import styles from "./ManuelLayout.module.css";

function ManuelFirstOptions({ description, name }) {
  const { dispatch } = useCocktails();
  return (
    <div
      style={{ color: "white" }}
      className={styles.manuelLayoutInnerContainer}
      onClick={() => dispatch({ type: "secondOptions" })}
    >
      <div className={styles.typeContainer}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ManuelFirstOptions;
