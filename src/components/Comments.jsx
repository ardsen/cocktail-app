import styles from "./CocktailRecipe.module.css";
import StarRating from "./StarRating";

function Comments({ score, name, comment }) {
  const filteredName = name
    .split(" ")
    .map((cur) => cur.at(0) + cur.at(1) + cur.slice(2).replace(/./g, "*"));

  return (
    <div className={styles.commentsInner}>
      <div className={styles.commentAndScore}>
        <h5>{filteredName}</h5>
        <StarRating
          defaultRating={score}
          size={20}
          className="noClick"
          color="#fbff00"
        />
      </div>
      <div>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default Comments;
