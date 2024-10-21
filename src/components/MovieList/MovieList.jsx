import { Link, useLocation } from "react-router-dom";
import style from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies) return;

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

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
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                    : defaultImg
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
