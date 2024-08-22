import styles from "./AppMain.module.css";
import { useCocktails } from "../contexts/CocktailsContext";
import { useNavigate } from "react-router-dom";

function ManualSearch() {
  const navigate = useNavigate();
  const { dispatch, isManuelOpen, getCocktailType } = useCocktails();

  function handleClick() {
    dispatch({ type: "manuelClicked" });
    navigate("/app");
    if (!isManuelOpen) getCocktailType();
  }
  return (
    <button className={styles.manualSearch} onClick={handleClick}>
      {isManuelOpen ? "Geri Dön" : "Manuel Ara"}
    </button>
  );
}

export default ManualSearch;
