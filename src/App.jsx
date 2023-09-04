import classes from "./app.module.css";
import NavBar from "./componens/NavBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Footer from "./componens/Footer";
import MyContextProvider, { MyContext } from "./store/MyContext";
import { useEffect, useContext } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);

  return (
    <MyContextProvider>
      <div className={classes.app}>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TvShows />} />
        </Routes>
        <Footer />
      </div>
    </MyContextProvider>
  );
}

export default App;
