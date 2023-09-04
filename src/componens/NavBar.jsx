import React, { useEffect, useState } from "react";
import classes from "../styles/navbar.module.css";
import "../styles/navbar.css";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [scrollY, setScrollY] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.scrollY > 40) {
        setScrollY(!scrollY);
      } else {
        setScrollY(false);
      }
    };
    const handleToggle = () => {
      if (window.innerWidth < 1080) {
        setMenuToggle(true);
      } else {
        setMenuToggle(false);
        setOpenedMenu(false);
      }
    };
    window.addEventListener("resize", handleToggle);
    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
      window.removeEventListener("resize", handleToggle);
    };
  }, []);

  const openMenuHandler = () => {
    setOpenedMenu(!openedMenu);
  };

  return (
    <div>
      <div
        className={classes.wrapper}
        style={scrollY ? { background: "rgba(0, 0, 0, 0.9)" } : {}}
      >
        <div className={classes.poster}>Movie</div>
        <nav
          className={classes.links}
          style={{ display: menuToggle && "none" }}
        >
          <NavLink to="/home" className={classes.link}>
            Home
          </NavLink>
          <NavLink to="/movies" className={classes.link}>
            Movies
          </NavLink>
          <NavLink to="/tv" className={classes.link}>
            TV-shows
          </NavLink>
        </nav>
        <div className={classes["search-wrapper"]}>
          <div
            onClick={openMenuHandler}
            className={classes.menu}
            style={{
              display: menuToggle && "block",
              transform: openedMenu && "rotate(360deg)",
              borderRadius: openedMenu && "20px",
            }}
          >
            <span
              className={classes.top}
              style={{
                transform: openedMenu && "rotate(45deg) translateY(14px)",
                background: openedMenu && "red",
              }}
            ></span>
            <span
              className={classes.mid}
              style={{ background: openedMenu && "transparent" }}
            ></span>
            <span
              className={classes.bot}
              style={{
                transform: openedMenu && "rotate(-45deg) translateY(-14px)",
                background: openedMenu && "red",
              }}
            ></span>
          </div>
          <div className={classes.search}>
            <BsSearch />
          </div>
          <div className={classes.profile}>D</div>
        </div>
      </div>
      <nav
        onClick={openMenuHandler}
        className={classes["menu-links"]}
        style={{
          background: scrollY && "rgba(0, 0, 0, 0.9)",
          transform: openedMenu && "translate(0)",
        }}
      >
        <NavLink to="/home" className={classes.link}>
          Home
        </NavLink>
        <NavLink to="/movies" className={classes.link}>
          Movies
        </NavLink>
        <NavLink to="/tv" className={classes.link}>
          TV-shows
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
