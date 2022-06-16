import React from "react";
import Col from "react-bootstrap/Col";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";

export function Movies({ user, movies, onLoggedIn }) {
  if (!user)
    return (
      <Col>
        <LoginView onLoggedIn={(user) => onLoggedIn(user)} />
      </Col>
    );
  // Before the movies have been loaded
  if (movies.length === 0) return <div className="main-view"></div>;

  return movies.map((m) => (
    <Col md={4} key={m._id}>
      <MovieCard movie={m} />
    </Col>
  ));
}
