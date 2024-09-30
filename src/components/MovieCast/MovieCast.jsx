import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastById } from "../../services/api";
import style from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const getCast = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchCastById(movieId);
        setCasts(data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  if (!casts) return <Loader />;

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ul>
        {casts.map((cast) => (
          <li className={style.castItem} key={cast.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
              alt={cast.name}
            />
            <p className={style.castItemName}>{cast.name}</p>
            <p>Character: {cast.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
