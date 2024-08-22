import styles from "./CocktailRecipe.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useAuth } from "../contexts/AuthContext";
// import Comments from "./Comments";
import AddComment from "./AddComment";
import CommentSection from "./CommentSection";
function CocktailRecipe() {
  const { code } = useParams();
  const { token } = useAuth();
  const [cocktail, setCocktail] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const getAll = async function () {
      try {
        setIsLoading(true);

        const res = await fetch("http://35.238.41.225:85/api/recipes/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const cocktailRecipe = data.message.find((cur) => cur.code === code);

        setCocktail(cocktailRecipe);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAll();
  }, [code, token, isAddCommentOpen]);
  useEffect(() => {
    if (!cocktail) return;
    const getComment = async function () {
      try {
        setIsCommentsLoading(true);
        const res = await fetch(
          `http://35.238.41.225:85/api/comments/recipe/${cocktail.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (Array.isArray(data.message)) setComments(data.message);

        const averageRatingCalc = Array.isArray(data.message)
          ? +(
              data.message
                .map((cur) => cur.score)
                .reduce((acc, cur) => acc + cur, 0) / data.message.length
            ).toFixed(1)
          : 0;

        setAverageRating(averageRatingCalc);
        setIsCommentsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getComment();
  }, [cocktail, token, averageRating]);

  if (isLoading || !cocktail) return <Spinner />;
  return (
    <div className={styles.cocktailContainer}>
      {isAddCommentOpen && (
        <AddComment
          cocktailId={cocktail.id}
          setIsAddCommentOpen={setIsAddCommentOpen}
          code={code}
        />
      )}
      <h3>{cocktail && cocktail.name}</h3>
      <div className={styles.topContainer}>
        <div className={styles.materialContainer}>
          <h4>Malzemeler</h4>
          {cocktail.materials.map((material) => (
            <li key={material}>{material}</li>
          ))}
        </div>
        <div className={styles.recipe}>
          <h4>Tarif</h4>
          {cocktail.description.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomContainerInner}>
          <CommentSection
            comments={comments}
            averageRating={averageRating}
            setIsAddCommentOpen={setIsAddCommentOpen}
            isCommentsLoading={isCommentsLoading}
          />

          {/* <div className={styles.topicAddComment}>
            <h4>Yorumlar</h4>
            <button onClick={() => setIsAddCommentOpen(true)}>
              Yorum Ekle
            </button>
          </div>
          <div className={styles.commentIndividual}>
            {comments ? (
              comments.map((comment) => (
                <Comments
                  key={comment.id}
                  comment={comment.comment}
                  name={comment.name}
                  score={comment.score}
                />
              ))
            ) : (
              <p className={styles.noCommentYet}>Henüz yorum yapılmamış...</p>
            )}
          </div> */}
        </div>
      </div>
      {isAddCommentOpen && (
        <div
          className="overlay"
          onClick={() => setIsAddCommentOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default CocktailRecipe;
