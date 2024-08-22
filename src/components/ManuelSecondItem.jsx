import { useAuth } from "../contexts/AuthContext";
import { useCocktails } from "../contexts/CocktailsContext";

function ManuelSecondItem({ opt }) {
  const { token } = useAuth();
  const { dispatch } = useCocktails();
  const getManuel = async function () {
    try {
      dispatch({ type: "dataLoading" });
      const res = await fetch(`http://35.238.41.225:85/api/recipes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const filteredData = data.message.filter((cur) =>
        cur.materials.some((material) =>
          material.toLowerCase().includes(opt.toLowerCase())
        )
      );
      dispatch({ type: "manuelSearchData", payload: filteredData });
    } catch (err) {
      console.log(err.message);
    }
  };

  return <li onClick={getManuel}>{opt}</li>;
}

export default ManuelSecondItem;
