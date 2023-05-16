import React, { useState } from "react";
import axios from "axios";
import { Container, Figure, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./favorite-movies.css";

export function FavoriteMovies({
  favoriteMoviesList,
  movies,
  username,
  onFavoriteMovieRemoved,
}) {
  const [isReq, setIsReq] = useState(false);

  if (movies === null || movies.length === 0) {
    return null;
  }

  const filteredMovies = favoriteMoviesList.map((fav) => {
    const foundMovie = movies.find((movie) => fav === movie._id);
    return foundMovie;
  });

  const removeFav = (_id, username) => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      return;
    }
    if (isReq === true) {
      return;
    }

    const url = `https://myflix-api-gkm.herokuapp.com/users/${username}/movies/${_id}`;

    setIsReq(true);

    axios
      .delete(url, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(() => {
        onFavoriteMovieRemoved();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsReq(false);
      });
  };

  return (
    <div>
      <Row className="favorite-movies_title">
        <Col xs={12}>
          <h2>Favorite Movies</h2>
        </Col>
      </Row>

      <Row className="favorite-movies__list g-2">
        {filteredMovies.map((movie) => {
          const { _id, imageUrl, title } = movie;

          return (
            <Col
              className="favorite-movie__card"
              key={_id}
              xs={6}
              md={3}
              lg={2}
            >
              <Card className="favorite-movie-card">
                <Card.Img
                  className="favorite-movie-card__img"
                  variant="top"
                  src={imageUrl}
                />
                <Card.ImgOverlay className="favorite-movie-card__overlay">
                  <Card.Title className="favorite-movie-card__title">
                    {title}
                  </Card.Title>
                  <Card.Footer className="mx-auto">
                    <Button
                      className="favorite-movie__btn-remove"
                      variant="secondary"
                      onClick={() => removeFav(_id, username)}
                    >
                      Remove
                    </Button>
                  </Card.Footer>
                </Card.ImgOverlay>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
