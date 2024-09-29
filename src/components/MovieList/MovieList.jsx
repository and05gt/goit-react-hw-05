import { Link, useLocation } from "react-router-dom";
import style from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies) return;

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              className={style.movieLink}
              to={`/movies/${movie.id.toString()}`}
              state={location}
            >
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
