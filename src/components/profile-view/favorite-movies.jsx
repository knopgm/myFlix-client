import React from "react";
import { Figure, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function FavoriteMovies({ favoriteMoviesList, movies }) {
  const filteredMovies = favoriteMoviesList.map((fav) => {
    const foundMovie = movies.find((movie) => fav === movie._id);
    return foundMovie;
  });

  return (
    <>
      <Row className="my-card">
        <Col xs={12}>
          <h2>Favorite Movies</h2>
        </Col>
      </Row>
      <Row>
        {filteredMovies.map((el) => {
          return (
            <Col key={el._id} xs={12} md={6} lg={4}>
              <Figure>
                <Link to={`/movies/${movies._id}`}>
                  <Figure.Image
                    variant="top"
                    src={el.imageUrl}
                    alt={el.title}
                  />
                  <Figure.Caption>{el.title}</Figure.Caption>
                </Link>
              </Figure>
              <Button variant="secondary" onClick={() => removefav(el._id)}>
                Remove
              </Button>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
