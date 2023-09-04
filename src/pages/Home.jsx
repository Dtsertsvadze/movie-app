import MainPoster from "../componens/MainPoster";
import Carousel from "../componens/Carousel";
import classes from "../styles/home.module.css";
import Premiere from "../componens/Premiere";
import { useContext } from "react";
import { MyContext } from "../store/MyContext";
import MovieDetails from "../componens/MovieDetails";

const Home = () => {
  const { selectedMovie, updateSelectedMovie } = useContext(MyContext);

  const closeHandler = () => {
    updateSelectedMovie([]);
  };

  return (
    <div className={classes.wrapper}>
      {selectedMovie.opened && <MovieDetails onClose={closeHandler} />}
      <MainPoster path="/trending/movie/day?language=en-US" />
      <Carousel
        category="Trending of the Week"
        path="/trending/movie/week?language=en-US"
      />
      <Carousel
        category="Upcoming Movies"
        path="/movie/upcoming?language=en-US&page=1"
      />
      <Carousel
        category="Popular of All Time"
        path="/movie/top_rated?language=en-US&page=1"
      />

      <Premiere />
    </div>
  );
};

export default Home;
