import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-view.css";

export class MovieView extends React.Component {
  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick, addToFavMovies } = this.props;
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
