import { useState } from "react";
import styles from "./AddComment.module.css";
import StarRating from "./StarRating";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AddComment({ cocktailId, setIsAddCommentOpen, code }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { token } = useAuth();

  async function addComment() {
    const res = await fetch(`http://35.238.41.225:85/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recipe: cocktailId,
        name: name,
        comment: comment,
        score: rating,
      }),
    });
    const data = await res.json();
    console.log(data);
  }
  function handleSubmit(e) {
    e.preventDefault();
    addComment();
    setIsAddCommentOpen(false);
    navigate(`/app/${code}`);
  }
  return (
    <div className={styles.addCommentContainer}>
      <div className={styles.formContainer}>
        <button
          className={styles.close}
          onClick={() => setIsAddCommentOpen(false)}
        >
          &#10007;
        </button>
        <form action="POST" onSubmit={handleSubmit}>
          <div className={styles.input}>
            <label htmlFor="name">İsim:</label>
            <input
              type="text"
              htmlFor="name"
              placeholder="İsminiz..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="comment">Yorum:</label>
            <textarea
              name="comment"
              htmlFor="comment"
              id="comment"
              placeholder="Yorumunuz..."
              rows={4}
              cols={40}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="rating" className={styles.scoreTopic}>
              Puanınız
            </label>
            <StarRating onSetRating={setRating} />
          </div>
          <button>Yorum Ekle</button>
        </form>
      </div>
    </div>
  );
}

export default AddComment;
