import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";

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
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Description: {movie.description}</ListGroup.Item>
            <ListGroup.Item>
              Genre: {movie.genre.name}
              <Card.Text> Description: {movie.genre.description}</Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
              Director: {movie.director.name}
              <Card.Text> Bio: {movie.director.bio}</Card.Text>
            </ListGroup.Item>
          </ListGroup>

          <Button onClick={() => onBackClick(null)}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
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
