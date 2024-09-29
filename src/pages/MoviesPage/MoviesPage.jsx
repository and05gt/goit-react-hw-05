import { useState, useEffect, useMemo } from "react";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { fetchSearchByQuery } from "../../services/api";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getMoviesByQuery = async () => {
      const data = await fetchSearchByQuery(query);
      setMovies(data.results);
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
      <MovieList movies={filteredMovies} />
    </>
  );
};

export default MoviesPage;
