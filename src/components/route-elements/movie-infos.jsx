import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";

export function MovieInfos({ user, movies, history, onLoggedIn }) {
  const urlParams = useParams();

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
  return (
    <Col md={8}>
      <MovieView
        movie={movies.find((m) => m._id === urlParams.id)}
        onBackClick={() => window.history.back()}
      />
    </Col>
  );
}
