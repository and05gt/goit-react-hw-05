import { useState, useEffect, useMemo } from "react";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { fetchSearchByQuery } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getMoviesByQuery = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchSearchByQuery(query);
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesByQuery();
  }, [query]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      ),
    [movies, query]
  );

  return (
    <>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieList movies={filteredMovies} />
    </>
  );
};

export default MoviesPage;
