import { useCocktails } from "../contexts/CocktailsContext";
import ManuelFirstOptions from "./ManuelFirstOptions";
import styles from "./ManuelLayout.module.css";
import ManuelSecondOptions from "./ManuelSecondOptions";

function ManuelLayout() {
  const { firstOptions, isSecondOptionsOpen } = useCocktails();
  if (!firstOptions) return;

  return (
    <div className={styles.manuelLayoutContainer}>
      {firstOptions.map((type) => (
        <ManuelFirstOptions
          key={type.id}
          description={type.description}
          name={type.name}
        />
      ))}
      {isSecondOptionsOpen && <ManuelSecondOptions />}
    </div>
  );
}

export default ManuelLayout;
