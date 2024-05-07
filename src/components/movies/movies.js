import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removFav } from "../../store/slice/favMovies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const favMovies = useSelector((state) => state.favMovies.fav);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=04229759bd2257e769a077ccb97a575f&page=${page}`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const back = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const next = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const search = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=e745abc45c5a8b28694e3e3347259f04&query=${encodeURIComponent(inputValue)}`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isFav = (movie) => favMovies.some((fav) => fav.id === movie.id);

  const handlToggleFavMovie = (movie) => {
    if (isFav(movie)) {
      dispatch(removFav(movie));
    } else {
      dispatch(addFav(movie));
    }
  };

  const language = useSelector((state) => state.language);

  return (
    <div dir={language.language === "en" ? "rtl" : "ltr"}>
      <Container>
        <h1 className="mt-5 mb-4">Movies</h1>
        <input
          className="form-control p-2 m-5"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search"
        />
        <button className="btn btn-success" onClick={search}>Search</button>
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="movie-card">
                <button
                  className="btn"
                  onClick={() => handlToggleFavMovie(movie)}
                >
                  <FontAwesomeIcon icon={isFav(movie) ? solidStar : regularStar} />
                </button>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <Card.Body>
                  <Link to={`/details/${movie.id}`}>{movie.original_title}</Link>
                  <Card.Text>{movie.overview}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <div className="d-flex justify-content-between">
            <Button variant="success" onClick={back} disabled={page === 1}>Back</Button>
            <Button variant="success" onClick={next}>Next</Button>
          </div>
        </Row>
      </Container>
    </div>
  );
}
