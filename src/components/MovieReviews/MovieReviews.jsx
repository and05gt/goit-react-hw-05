import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsById } from "../../services/api";
import style from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const getReviews = async () => {
      const data = await fetchReviewsById(movieId);
      setReviews(data.results);
    };
    getReviews();
  }, [movieId]);

  if (!reviews) return <h1>Loading...</h1>;

  return (
    <div>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <p className={style.reviewAuthor}>Author: {review.author}</p>
              <p className={style.reviewText}>{review.content}</p>
            </li>
          ))
        ) : (
          <p>We don&apos;t nave any reviews for this movie.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
