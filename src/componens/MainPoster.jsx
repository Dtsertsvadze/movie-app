import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "../styles/mainposter.module.css";

import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { MyContext } from "../store/MyContext";

const MainPoster = ({ path }) => {
  const [movies, setMovies] = useState([]);
  const [scrollAmount, setScrollAmount] = useState(0);
  const sliderRef = useRef();
  const fetchOnce = useRef(true);

  const API_KEY = "&api_key=66a0f1d292a5298e7bd8bed7abb97bbc";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = BASE_URL + path + API_KEY;

  const fetchMovies = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    const firstFive = data.results.slice(0, 5);
    setMovies(firstFive);
  };

  useEffect(() => {
    fetchOnce.current && fetchMovies();
    return () => {
      fetchOnce.current = false;
    };
  }, []);

  useEffect(() => {
    const renewScroll = () => {
      setScrollAmount(0);
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    };

    window.addEventListener("resize", renewScroll);
    return () => window.removeEventListener("resize", renewScroll);
  }, []);

  const leftSlide = () => {
    const offsetWidth = sliderRef.current.offsetWidth;
    const newPosition = Math.max(scrollAmount - offsetWidth, 0);
    setScrollAmount(newPosition);

    sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  const rightSlide = () => {
    const offsetWidth = sliderRef.current.offsetWidth;
    const containerWidth = sliderRef.current.scrollWidth;
    const maxScrollAmount = containerWidth - offsetWidth;
    const newPosition = Math.min(scrollAmount + offsetWidth, maxScrollAmount);
    setScrollAmount(newPosition);
    sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  const ctx = useContext(MyContext);

  const passDataHandler = (movie) => {
    console.log(movie);
    ctx.updateSelectedMovie({ opened: true, ...movie });
  };

  const movie = movies.map((i) => (
    <div key={i.id} className={classes.movie}>
      <img
        className={classes.poster}
        src={`https://image.tmdb.org/t/p/w500${i.backdrop_path}`}
      />
      <div className={classes.content}>
        <div className={classes["title-wrapper"]}>
          <h1 className={classes.title}>{i.title}</h1>
          <p className={classes.description}>{i.overview}</p>
        </div>
        <div className={classes["button-wrapper"]}>
          <button className={classes.play}>PLAY</button>
          <button
            onClick={() => {
              passDataHandler(i);
            }}
            className={classes.details}
          >
            DETAILS
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className={classes.container}>
      <div onClick={leftSlide} className={classes.left}>
        <AiOutlineLeft />
      </div>
      <div ref={sliderRef} className={classes.slider}>
        {movie}
      </div>
      <div onClick={rightSlide} className={classes.right}>
        <AiOutlineRight />
      </div>
    </div>
  );
};

export default MainPoster;
