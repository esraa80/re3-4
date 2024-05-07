import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removFav } from "../../store/slice/favMovies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export default function Favorits() {
  const favMovies = useSelector((state) => state.favMovies.fav);
  const dispatch = useDispatch();

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
        <h1 className="mt-5 mb-4 font-size-2 text-info">Your favorite movies: {favMovies.length}</h1>
        <Row>
          {favMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>
                    <Link to={`/details/${movie.id}`} className="text-decoration-none text-dark">
                      {movie.original_title}
                    </Link>
                  </Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                  <Button
                    onClick={() => handlToggleFavMovie(movie)}
                    variant={isFav(movie) ? "warning" : "outline-warning"}
                    className="w-100"
                  >
                    <FontAwesomeIcon icon={isFav(movie) ? solidStar : regularStar} className="me-2" />
                    {isFav(movie) ? "Remove from favorites" : "Add to favorites"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
