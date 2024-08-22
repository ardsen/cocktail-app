import { useCocktails } from "../contexts/CocktailsContext";
import styles from "./ErrorMessage.module.css";

function ErrorMessage() {
  const { errorMessage } = useCocktails();
  if (!errorMessage) return;
  return <div className={styles.errorMessage}>{errorMessage}</div>;
}

export default ErrorMessage;
