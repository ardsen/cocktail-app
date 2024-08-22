import { useAuth } from "../contexts/AuthContext";

function Overlay() {
  const { dispatch } = useAuth();
  function handleClick() {
    dispatch({ type: "loginScreenClose" });
    dispatch({ type: "signUpClose" });
  }
  return <div className="overlay" onClick={handleClick}></div>;
}

export default Overlay;
