import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "../styles/carousel.module.css";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import MovieCard from "./MovieCard";
import { MyContext } from "../store/MyContext";

const Carousel = ({ category, path }) => {
  const [movies, setMovies] = useState([]);
  const [scrollAmount, setScrollAmount] = useState(0);
  const sliderRef = useRef();
  const fetchOnce = useRef(true);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const API_KEY = "&api_key=66a0f1d292a5298e7bd8bed7abb97bbc";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = BASE_URL + path + API_KEY;

  const fetchMovies = async () => {
    const result = await fetch(API_URL);
    const data = await result.json();
    setMovies(data.results);
  };

  useEffect(() => {
    setHoveredMovie(null);
    // Reset hovered movie when movies change
  }, [movies]);

  useEffect(() => {
    fetchOnce.current && fetchMovies();

    return () => {
      fetchOnce.current = false;
    };
  }, []);

  useEffect(() => {
    const renewScroll = () => {
      setScrollAmount(0);
      sliderRef.current.scrollTo({ left: 0 });
    };
    window.addEventListener("resize", renewScroll);
    return () => window.removeEventListener("resize", renewScroll);
  }, []);

  const { updateSelectedMovie } = useContext(MyContext);

  const passDataHandler = (movie) => {
    updateSelectedMovie({opened: true, ...movie});

  };

  const carousel = movies.map((movie) => (
    <MovieCard
      movieDataHandler={() => passDataHandler(movie)}
      key={movie.id}
      poster={movie.poster_path}
      isHovered={hoveredMovie === movie.id}
      onMouseEnter={() => setHoveredMovie(movie.id)}
      onMouseLeave={() => setHoveredMovie(null)}
      imdb={movie.vote_average}
    />
  ));

  const slideLeftHandle = () => {
    const sliderWidth = sliderRef.current.offsetWidth;
    const newPosition = Math.max(scrollAmount - sliderWidth, 0);
    setScrollAmount(newPosition);
    console.log(newPosition);
    sliderRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  const slideRightHandle = () => {
    const sliderWidth = sliderRef.current.offsetWidth;
    const maxScrollAmount = sliderRef.current.scrollWidth - sliderWidth;
    const newPosition = Math.min(scrollAmount + sliderWidth, maxScrollAmount);
    setScrollAmount(newPosition);
    sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  return (
    <div className={classes.container}>
      <h1>{category}</h1>
      <div className={classes.slider}>
        <div onClick={slideLeftHandle} className={classes["handle"]}>
          <BsChevronLeft className={classes["left-handle"]} />
        </div>
        <div ref={sliderRef} className={classes.wrapper}>
          {carousel}
        </div>
        <div onClick={slideRightHandle} className={classes["handle"]}>
          <BsChevronRight className={classes["right-handle"]} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
