import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../store/slice/language";

const Navbar = () => {
   const language = useSelector((state) => state.language.language);
   const dispatch = useDispatch();
   const toggleLang = () => {
     const newLang = language === "en" ? "ar" : "en";
     dispatch(changeLang(newLang));
     console.log(language);
   };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/movies">
        Movies
      </Link>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/favorits">
              Favorites
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-info" onClick={toggleLang}>
              Language: {language}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
