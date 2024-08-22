import { useNavigate } from "react-router-dom";
import { useCocktails } from "../contexts/CocktailsContext";
import styles from "./AppMain.module.css";

function GetRandomButton() {
  const { getRandomCocktail } = useCocktails();
  const navigate = useNavigate();
  function handleClick() {
    navigate("/app");
    getRandomCocktail();
  }
  return (
    <button onClick={handleClick} className={styles.getRandomButton}>
      Rastgele Bir Kokteyl🍸
    </button>
  );
}

export default GetRandomButton;
