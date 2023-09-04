import React, { useContext, useEffect, useState } from "react";
import classes from "../styles/premiere.module.css";
import { MyContext } from "../store/MyContext";

const Premiere = ({ path }) => {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  const fetchMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=66a0f1d292a5298e7bd8bed7abb97bbc"
    );
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const selectedMovie = getRandomElement(movies);
      setRandomMovie(selectedMovie);
    }
  }, [movies]);

  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const ctx = useContext(MyContext);

  const passDataHandler = (movie) => {
    console.log(movie);
    ctx.updateSelectedMovie({ opened: true, ...movie });
  };

  return (
    <div className={classes.container}>
      <div className={classes.heading}>Movie`s Choice</div>
      {randomMovie && (
        <div className={classes.wrapper}>
          <img
            alt={randomMovie.title}
            src={`https://image.tmdb.org/t/p/w500/${randomMovie.backdrop_path}`}
            className={classes.poster}
          />
          <div className={classes.content}>
            <div className={classes.actions}>
              <button className={classes.play}>PLAY</button>
              <button
                onClick={() => passDataHandler(randomMovie)}
                className={classes.details}
              >
                DETAILS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premiere;
