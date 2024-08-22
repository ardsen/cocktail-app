import { useNavigate } from "react-router-dom";
import { useCocktails } from "../contexts/CocktailsContext";
import styles from "./AppMain.module.css";

function SearchBar() {
  const { dispatch, getCocktailBySearch, searchForm } = useCocktails();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!searchForm) return;
    navigate("/app");
    dispatch({ type: "closeManuel" });
    getCocktailBySearch();
  }
  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <label htmlFor="search"></label>
      <input
        type="text"
        htmlFor="search"
        placeholder="Malzemeye Göre Ara..."
        onChange={(e) =>
          dispatch({ type: "searchForm", payload: e.target.value })
        }
        value={searchForm}
      />
      <button>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#111"
        >
          <g id="SVGRepo_bgCarrier" />

          <g id="SVGRepo_tracerCarrier" />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#fff"
            />{" "}
          </g>
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;
