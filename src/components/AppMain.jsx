import styles from "./AppMain.module.css";
import { Outlet, useParams } from "react-router-dom";
import AppNavBar from "./AppNavBar";
import AppRecipes from "./AppRecipes";
import { useCocktails } from "../contexts/CocktailsContext";
import ManuelLayout from "./ManuelLayout";
import ErrorMessage from "./ErrorMessage";
import AppHome from "./AppHome";

function AppMain() {
  const { code } = useParams();
  const {
    isManuelOpen,
    cocktailsBySearch,
    manuelSearchData,
    randomCocktail,
    isLoading,
    errorMessage,
  } = useCocktails();
  const isAnythingOpen =
    cocktailsBySearch ||
    manuelSearchData ||
    randomCocktail ||
    isManuelOpen ||
    isLoading ||
    errorMessage
      ? true
      : false;

  return (
    <main className={styles.mainContainer}>
      <AppNavBar />
      {!isAnythingOpen && <AppHome />}
      {code ? <Outlet /> : <AppRecipes />}
      {isManuelOpen && <ManuelLayout />}
      <ErrorMessage />
    </main>
  );
}

export default AppMain;
