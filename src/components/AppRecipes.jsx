import Spinner from "./Spinner";
import styles from "./AppMain.module.css";

import Cocktail from "./Cocktail";
import { useCocktails } from "../contexts/CocktailsContext";

function AppRecipes() {
  const { randomCocktail, isLoading, cocktailsBySearch, manuelSearchData } =
    useCocktails();

  return (
    <>
      {isLoading ? <Spinner /> : ""}
      <div
        className={`${
          (cocktailsBySearch || randomCocktail || manuelSearchData) &&
          styles.cocktailContainer
        }`}
      >
        {!isLoading && randomCocktail && (
          <Cocktail
            center="center"
            name={randomCocktail.name}
            materials={randomCocktail.materials}
            code={randomCocktail.code}
          />
        )}
        {!isLoading &&
          cocktailsBySearch &&
          cocktailsBySearch.map((cocktail) => (
            <Cocktail
              key={cocktail.id}
              name={cocktail.name}
              materials={cocktail.materials}
              code={cocktail.code}
            />
          ))}
        {!isLoading &&
          manuelSearchData &&
          manuelSearchData.map((cocktail) => (
            <Cocktail
              key={cocktail.id}
              name={cocktail.name}
              materials={cocktail.materials}
              code={cocktail.code}
            />
          ))}
      </div>
    </>
  );
}

export default AppRecipes;
