import { createContext, useContext, useReducer } from "react";
import { useAuth } from "./AuthContext";

const URL = "http://35.238.41.225:85";

const CoctailsContext = createContext();

const initialState = {
  randomCocktail: null,
  isLoading: false,
  searchForm: "",
  cocktailsBySearch: null,
  allCocktails: null,
  cocktail: null,
  isManuelOpen: false,
  firstOptions: null,
  isSecondOptionsOpen: false,
  manuelSearchData: null,
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataLoading":
      return {
        ...state,
        firstOptions: null,
        errorMessage: "",
        isLoading: true,
        searchForm: "",
      };
    case "dataReceived":
      return {
        ...state,
        errorMessage: "",

        cocktailsBySearch: null,
        manuelSearchData: null,
        isManuelOpen: false,
        randomCocktail: action.payload,
        isLoading: false,
      };
    case "searchForm":
      return {
        ...state,
        searchForm: action.payload,
      };
    case "searchReceived":
      return {
        ...state,
        searchForm: "",
        errorMessage: "",
        isLoading: false,
        isManuelOpen: false,
        randomCocktail: null,
        manuelSearchData: null,
        cocktailsBySearch: action.payload,
      };
    case "manuelClicked":
      return {
        ...state,
        searchForm: "",
        errorMessage: "",
        randomCocktail: null,
        cocktailsBySearch: null,
        manuelSearchData: null,
        isManuelOpen: !state.isManuelOpen,
        isSecondOptionsOpen: false,
      };
    case "manuelOptions":
      return {
        ...state,
        isLoading: false,
        firstOptions: action.payload,
      };
    case "closeManuel":
      return {
        ...state,
        isManuelOpen: false,
      };
    case "secondOptions":
      return {
        ...state,
        isSecondOptionsOpen: true,
      };
    case "manuelSearchData":
      return {
        ...state,
        isLoading: false,
        isManuelOpen: false,
        manuelSearchData: action.payload,
      };
    case "reset":
      return {
        ...state,
        randomCocktail: null,
        isLoading: false,
        cocktailsBySearch: null,
        allCocktails: null,
        cocktail: null,
        searchForm: "",
        isManuelOpen: false,
        firstOptions: null,
        isSecondOptionsOpen: false,
        manuelSearchData: null,
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        cocktailsBySearch: null,
        errorMessage: action.payload,
      };
    // case "getAll": {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     allCocktails: action.payload,
    //   };
    // }

    default:
      throw new Error("Unknown action");
  }
}

function CocktailsProvider({ children }) {
  const [
    {
      randomCocktail,
      isLoading,
      searchForm,
      cocktailsBySearch,
      isManuelOpen,
      firstOptions,
      isSecondOptionsOpen,
      manuelSearchData,
      errorMessage,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { token } = useAuth();

  const getRandomCocktail = async function () {
    try {
      dispatch({ type: "dataLoading" });
      const res = await fetch(`${URL}/api/recipes/random`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      dispatch({ type: "dataReceived", payload: data.message });
    } catch (err) {
      console.log(err);
    }
  };

  const getCocktailBySearch = async function () {
    try {
      dispatch({ type: "dataLoading" });
      const res = await fetch(`${URL}/api/recipes/search/${searchForm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (
        data.message ===
        "A cocktail made with the ingredients you are looking for could not be found."
      ) {
        throw new Error("Aradığınız malzemeye göre tarif bulunamadı...");
      }

      dispatch({ type: "searchReceived", payload: data.message });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    }
  };

  // const getCocktailByCode = async function(){
  //   try{
  //     dispatch({type: "dataLoading"})
  //     const res = await fetch(`${URL}/api/`)
  //   }
  // }
  const getCocktailType = async function () {
    try {
      dispatch({ type: "dataLoading" });
      const res = await fetch(`${URL}/api/types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      dispatch({ type: "manuelOptions", payload: data.message });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CoctailsContext.Provider
      value={{
        randomCocktail,
        getRandomCocktail,
        isLoading,
        searchForm,
        dispatch,
        getCocktailBySearch,
        cocktailsBySearch,
        isManuelOpen,
        getCocktailType,
        firstOptions,
        isSecondOptionsOpen,
        manuelSearchData,
        errorMessage,
      }}
    >
      {children}
    </CoctailsContext.Provider>
  );
}

function useCocktails() {
  const context = useContext(CoctailsContext);
  if (context === undefined)
    throw new Error("Something wrong with the context");
  return context;
}
export { CocktailsProvider, useCocktails };
