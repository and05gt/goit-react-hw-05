import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { fetchMoviesById } from "../../services/api";
import style from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");
  const [movie, setMovie] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const getMovieDetails = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMoviesById(movieId);
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie) return <Loader />;

  const { genres } = movie;
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Link className={style.linkBack} to={backLink.current}>
        Go back
      </Link>
      <div className={style.movieSection}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
              : defaultImg
          }
          width={200}
          alt={movie.title}
        />
        <div className={style.movieInfo}>
          <h2>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <p>
            User Score:{" "}
            {movie.vote_average.toString().split(".").join("").slice(0, 2)}%
          </p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <ul className={style.genresList}>
            {genres.map((genre) => (
              <li className={style.genresListItem} key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={style.wrapper}>
        <p>Additional information</p>
        <div className={style.wrapperLink}>
          <Link className={style.link} to="cast">
            Cast
          </Link>
          <Link className={style.link} to="reviews">
            Reviews
          </Link>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
