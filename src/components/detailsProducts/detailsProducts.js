import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DetailsProduct = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=04229759bd2257e769a077ccb97a575f`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <Container>
      <h1>Movie Details</h1>
      {movie && (
        <Row>
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <Card.Body>
                <Card.Title>{movie.original_title}</Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
                <Card.Text>Release Date: {movie.release_date}</Card.Text>
                <Card.Text>Rating: {movie.vote_average}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DetailsProduct;
