import React from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "./movie-view";

export function MovieInfos({ user, movies, history, onLoggedIn }) {
  const urlParams = useParams();

  const findMovie = (movies) => {
    return movies.find((m) => m._id === urlParams.id);
  };

  const handleFavoritedMovie = (movie) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken === null) {
      return;
    }

    console.log({
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const url = `https://myflix-api-gkm.herokuapp.com/users/${user}/movies/${movie._id}`;
    axios
      .post(url, {}, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!user)
    return (
      <Row>
        <Col>
          <LoginView onLoggedIn={(user) => onLoggedIn(user)} />
        </Col>
      </Row>
    );
  // Before the movies have been loaded
  if (movies.length === 0) return <div className="main-view"></div>;

  const movie = findMovie(movies);

  return (
    <Col md={8}>
      <MovieView
        movie={movie}
        onBackClick={() => window.history.back()}
        addToFavMovies={() => handleFavoritedMovie(movie)}
      />
    </Col>
  );
}
