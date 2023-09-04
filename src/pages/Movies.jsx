import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "../styles/movies.module.css";
import { fetchMovies } from "../store/FetchMovies";
import MovieCard from "../componens/MovieCard";
import { BsSearch } from "react-icons/bs";
import { searchEngine } from "../store/FetchMovies";
import { MyContext } from "../store/MyContext";
import MovieDetails from "../componens/MovieDetails";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [searching, setSearching] = useState(false);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      if (searching) {
        const replacementCharacter = "%20";
        const search = searchString.replace(/ /g, replacementCharacter);
        const searchedMovies = await searchEngine(
          `/search/movie?query=${search}&include_adult=false&language=en-US&page=${pageNumber}`
        );

        if (pageNumber === 1) {
          setMovies(searchedMovies);
        } else {
          setMovies((prev) => [...prev, ...searchedMovies]);
        }
      } else {
        const fetchedMovies = await fetchMovies(
          `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`
        );

        if (pageNumber === 1) {
          setMovies(fetchedMovies);
        } else {
          setMovies((prev) => [...prev, ...fetchedMovies]);
        }
      }
    };

    getMovies();
  }, [pageNumber, searchString, searching]);

  const inputChangeHandler = (e) => {
    const inputValue = e.target.value;
    setSearchString(inputValue);
    setPageNumber(1); // Reset the page number to 1 whenever the input changes
    setSearching(inputValue !== ""); // Set searching to true if input is not empty
  };

  const { selectedMovie, updateSelectedMovie } = useContext(MyContext);

  const passDataHandler = (movie) => {
    updateSelectedMovie({ opened: true, ...movie });
  };

  const closeHandler = () => {
    updateSelectedMovie({});
  };

  const movie = movies.map((movie) => (
    <MovieCard
      key={movie.id}
      poster={movie.poster_path}
      imdb={movie.vote_average}
      onMouseEnter={() => {
        setHoveredMovie(movie.id);
      }}
      onMouseLeave={() => {
        setHoveredMovie(null);
      }}
      isHovered={hoveredMovie === movie.id}
      movieDataHandler={() => {
        passDataHandler(movie);
      }}
    />
  ));

  return (
    <div className={classes.container}>
      {selectedMovie.opened && <MovieDetails onClose={closeHandler} />}
      <div className={classes.search}>
        <div className={classes.icon}>
          <BsSearch />
        </div>
        <div className={classes.actions}>
          <input
            value={searchString}
            onChange={inputChangeHandler}
            className={classes.input}
            placeholder="Search for movies"
          />
        </div>
      </div>
      <div className={classes.wrapper}>{movie}</div>
    </div>
  );
};

export default Movies;
