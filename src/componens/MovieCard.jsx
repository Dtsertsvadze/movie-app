import React from "react";
import classes from "../styles/moviecard.module.css";

const MovieCard = ({
  poster,
  imdb,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  movieDataHandler,
}) => {
  const dataHandler = () => {};

  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={classes.movie}
    >
      <div
        className={classes.backdrop}
        style={{ display: isHovered && "flex" }}
      >
        <button className={classes.play}>PLAY</button>
        <button onClick={movieDataHandler} className={classes.details}>
          DETAILS
        </button>
        <p className={classes.rating}>
          IMDB: <span className={classes.imdb}>{imdb}</span>
        </p>
      </div>
      <img
        className={classes.img}
        src={`https://image.tmdb.org/t/p/w500${poster}`}
      />
    </div>
  );
};

export default MovieCard;
