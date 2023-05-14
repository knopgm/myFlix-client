import React, { useState } from "react";
import axios from "axios";
import { Figure, Button, Row, Col } from "react-bootstrap";
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
    <>
      <Row className="favorite-movies">
        <Col xs={12}>
          <h2>Favorite Movies</h2>
        </Col>
      </Row>
      <Row className="favorite-movies__list">
        {filteredMovies.map((movie) => {
          const { _id, imageUrl, title } = movie;

          return (
            <Col
              className="favorite-movie__card"
              key={_id}
              xs={12}
              md={6}
              lg={4}
              style={{ marginBottom: "20px" }}
            >
              <Figure className="favorite-movie__img-card">
                <Link
                  className="favorite-movie__img-title-wrapper"
                  to={`/movies/${_id}`}
                >
                  <Figure.Image
                    className="favorite-movie__img"
                    variant="top"
                    src={imageUrl}
                    alt={title}
                  />
                  <Figure.Caption className="favorite-movie__title">
                    {title}
                  </Figure.Caption>
                </Link>
              </Figure>
              <Link to={`/users/${username}`}>
                <Button
                  className="favorite-movie__btn-remove"
                  variant="secondary"
                  onClick={() => removeFav(_id, username)}
                >
                  Remove
                </Button>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
