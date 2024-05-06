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

export default function Favorits() {
  const favMovies = useSelector((state) => state.favMovies.fav);
  console.log(favMovies);
  let isFav = (movie) => favMovies.some((fav) => fav.id === movie.id);
  const dispatch = useDispatch();
  const handlToggleFavMovie = (movie) => {
    if (isFav(movie)) {
      dispatch(removFav(movie));
      console.log(favMovies);
      console.log(isFav(movie));
    } else dispatch(addFav(movie));
  };
  const language = useSelector((state) => state.language);
  return (
    <div dir={language.language === "en" ? "rtl" : "ltr"}>
      <Container>
        <h1>movie you favirot is {favMovies.length}</h1>

        <Row>
          {favMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <button
                  className="btn"
                  onClick={() => handlToggleFavMovie(movie)}
                >
                  <FontAwesomeIcon
                    icon={isFav(movie) ? solidStar : regularStar}
                  />
                  {console.log(isFav(movie))}
                </button>

                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <Card.Body>
                  <Link to={`/details/${movie.id}`}>
                    {movie.original_title}
                  </Link>
                  <Card.Text>{movie.overview}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
  
      </Container>
    </div>
  );
}
