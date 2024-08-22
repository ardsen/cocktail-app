import styles from "./AppMain.module.css";
import SearchBar from "./SearchBar";
import GetRandomButton from "./GetRandomButton";
import ManualSearch from "./ManualSearch";
import { useCocktails } from "../contexts/CocktailsContext";
import { useNavigate } from "react-router-dom";
// import { useCocktails } from "../contexts/CocktailsContext";

function AppNavBar() {
  const navigate = useNavigate();
  const {
    dispatch,
    cocktailsBySearch,
    manuelSearchData,
    randomCocktail,
    isManuelOpen,
  } = useCocktails();

  const isAnythingOpen =
    cocktailsBySearch || manuelSearchData || randomCocktail || isManuelOpen
      ? true
      : false;

  return (
    <div className={styles.searchBarContainer}>
      {isAnythingOpen && (
        <button
          className={styles.back}
          onClick={() => {
            dispatch({ type: "reset" });
            navigate("/app");
          }}
        >
          <svg className={styles.backSvg} viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
          </svg>
        </button>
      )}
      <div className={styles.item}>
        <ManualSearch />
      </div>
      <div className={styles.item}>
        <SearchBar />
      </div>
      <div className={styles.item}>
        <GetRandomButton />
      </div>
    </div>
  );
}

export default AppNavBar;
