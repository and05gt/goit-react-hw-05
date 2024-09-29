import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastById } from "../../services/api";
import style from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const getCast = async () => {
      const data = await fetchCastById(movieId);
      setCasts(data.cast);
    };
    getCast();
  }, [movieId]);

  if (!casts) return <h1>Loading...</h1>;

  return (
    <div>
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
