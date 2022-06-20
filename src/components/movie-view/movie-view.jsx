import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.imageUrl} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Description: {movie.description}</ListGroup.Item>
            <ListGroup.Item>
              <Link to={`/genre/${movie.genre.name}`}>
                <Button variant="link">Genre</Button>
              </Link>
              {movie.genre.name}
              <Card.Text> Description: {movie.genre.description}</Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={`/directors/${movie.director.name}`}>
                <Button variant="link">Director</Button>
              </Link>
              {movie.director.name}
              <Card.Text> Bio: {movie.director.bio}</Card.Text>
            </ListGroup.Item>
          </ListGroup>

          <Button onClick={() => onBackClick()}>Back</Button>
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
