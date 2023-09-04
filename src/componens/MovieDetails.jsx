import React, { useContext } from "react";
import classes from "../styles/moviedetails.module.css";
import ReactDOM from "react-dom";
import { MyContext } from "../store/MyContext";

const GENRE = {
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "War & Politics",
  10751: "Family",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  10770: "TV Movie  ",
  10752: "War",
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  878: "Science Fiction",
  53: "Thriller  ",
  37: "Western",
};

const MovieDetails = (props) => {
  const { selectedMovie } = useContext(MyContext);

  let newArr = [];
  for (let i = 0; i < selectedMovie.genre_ids.length; i++) {
    newArr.push(GENRE[selectedMovie.genre_ids[i]]);
  }

  let genres = newArr.join(", ");

  return ReactDOM.createPortal(
    <div className={classes.container}>
      <div className={classes["movie-details"]}>
        <img
          className={classes.img}
          src={`https://image.tmdb.org/t/p/w500/${selectedMovie.backdrop_path}`}
        />
        <button onClick={props.onClose} className={classes.close}>
          CLOSE
        </button>
        <div className={classes.content}>
          <h1>{selectedMovie.title}</h1>
          <p>Rating: {selectedMovie.vote_average}</p>
          <p>
            Release Date:{" "}
            {selectedMovie.release_date
              ? selectedMovie.release_date
              : selectedMovie.first_air_date}
          </p>
          <p>Genre: {genres} </p>
          <p>{selectedMovie.overview}</p>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default MovieDetails;
