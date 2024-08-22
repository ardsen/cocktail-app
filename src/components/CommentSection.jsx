import styles from "./CocktailRecipe.module.css";
import Comments from "./Comments";
import LoaderForComments from "./LoaderForComments";
import StarRating from "./StarRating";

function CommentSection({
  comments,
  setIsAddCommentOpen,
  isCommentsLoading,
  averageRating,
}) {
  if (isCommentsLoading) return <LoaderForComments />;
  return (
    <>
      <div className={styles.topicAddComment}>
        <h4>Yorumlar</h4>
        <StarRating
          size={20}
          defaultRating={averageRating}
          className="average-rating"
          color="#fbff00"
        />
        <button onClick={() => setIsAddCommentOpen(true)}>Yorum Ekle</button>
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
      </div>
    </>
  );
}

export default CommentSection;
