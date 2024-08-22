import { useNavigate } from "react-router-dom";
import styles from "./Cocktail.module.css";
function Cocktail({ name, materials, code }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/app/${code}`);
  }
  return (
    <div className={styles.cocktailCard}>
      <h3>{name}</h3>
      <ul>
        <li>
          <strong>
            <u>Malzemeler</u>
          </strong>
        </li>
        {materials.map((material) => (
          <li key={material}>{material}</li>
        ))}
      </ul>
      <button onClick={handleClick}>
        Tarife Git &nbsp;
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Page-1" stroke="none" fill="none">
            <g
              id="Icon-Set-Filled"
              transform="translate(-310.000000, -1089.000000)"
              fill="#fff"
            >
              <path
                d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 L332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z"
                id="arrow-right-circle"
              ></path>
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}

export default Cocktail;
