import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, ListGroup, Row, Image, Stack } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-view.css";

export function MovieView(props) {
  const { movie, onBackClick, addToFavMovies } = props;

  return (
    <Row className="movie-view g-4">
      <Col md={4} className="d-flex justify-content-center">
        <Image src={movie.imageUrl} rounded className="movie-view__img" />
      </Col>

      <Col md={8}>
        <Card>
          <Card.Body className="movie-view__body">
            <Card.Title className="movie-view__title">{movie.title}</Card.Title>

            <Card.Text>
              <Link to={`/genre/${movie.genre.name}`}>{movie.genre.name}</Link>
            </Card.Text>
            <Card.Subtitle></Card.Subtitle>

            <Card.Text>Description: {movie.description}</Card.Text>

            <Card.Text>
              <Link to={`/directors/${movie.director.name}`}>
                Director: {movie.director.name}
              </Link>
            </Card.Text>
          </Card.Body>

          <Card.Footer>
            <Stack direction="horizontal" gap={2}>
              <Button
                className="movie-view__body-button"
                onClick={() => addToFavMovies()}
              >
                Favorite
              </Button>
              <Button
                className="movie-view__body-button"
                onClick={() => onBackClick()}
              >
                Back
              </Button>
            </Stack>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );

  return (
    <Card className="movie-view">
      <Card.Img
        className="movie-view__img"
        variant="top"
        src={movie.imageUrl}
      />

      <Card.Body className="movie-view__body">
        <Card.Title className="movie-view__title">{movie.title}</Card.Title>
        <Link className="movie-view__link" to={`/genre/${movie.genre.name}`}>
          {movie.genre.name}
        </Link>
        <Card.Text className="movie-view__description">
          Description: {movie.description}
        </Card.Text>
        <Link
          className="movie-view__link"
          to={`/directors/${movie.director.name}`}
        >
          Director: {movie.director.name}
        </Link>

        <ListGroup className="movie-view__body-buttons">
          <Button
            className="movie-view__body-button"
            onClick={() => addToFavMovies()}
          >
            Favorite
          </Button>
          <Button
            className="movie-view__body-button"
            onClick={() => onBackClick()}
          >
            Back
          </Button>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
