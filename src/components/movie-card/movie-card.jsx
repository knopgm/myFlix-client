import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import "./movie-card.css";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Link to={`/movies/${movie._id}`} style={{ color: "white" }}>
        <Card className="movie-card">
          <Card.Img
            className="movie-card__img"
            variant="top"
            src={movie.imageUrl}
          />
          <Card.ImgOverlay className="movie-card__overlay">
            <Card.Title className="movie-card__title">{movie.title}</Card.Title>
          </Card.ImgOverlay>
        </Card>
      </Link>
    );
  }
}

MovieCard.propTypes = {
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
    }),
  }).isRequired,
};
