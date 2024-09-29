import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../services/api";
import style from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data.results);
    };
    getMovies();
  }, []);

  return (
    <div>
      <p className={style.title}>Tranding today</p>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
