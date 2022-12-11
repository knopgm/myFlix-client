import React from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "./movie-view";
import { connect } from "react-redux";
import { setMoviesList } from "../../actions/actions";

function MovieInfos(props) {
  const { user, movies, moviesList, onLoggedIn } = props;
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

    if (moviesList.includes(movie)) {
      console.log("already favorited movie");
    }

    const url = `https://myflix-api-gkm.herokuapp.com/users/${user.username}/movies/${movie._id}`;
    axios
      .post(url, {}, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        // const data = response.data;
        // console.log(data);
        this.props.setMoviesList(response.data);
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

const mapStateToProps = (storeState) => {
  const { movies, moviesList, user } = storeState;
  return { movies, moviesList, user };
};

export default connect(mapStateToProps, { setMoviesList })(MovieInfos);
