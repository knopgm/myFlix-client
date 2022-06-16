import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { NavBar } from "../navbar/navbar";
import { Movies } from "../route-elements/movies";
import { MovieInfos } from "../route-elements/movie-infos";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null,
    };
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  // setSelectedMovie(newSelectedMovie) {
  //   this.setState({
  //     selectedMovie: newSelectedMovie,
  //   });
  // }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://myflix-api-gkm.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route
            path="/login"
            element={<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />}
          />
          <Route
            exact
            path="/"
            element={
              <Row>
                <Movies
                  user={user}
                  movies={movies}
                  onLoggedIn={(user) => this.onLoggedIn(user)}
                />
              </Row>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <MovieInfos
                user={user}
                movies={movies}
                onLoggedIn={(user) => this.onLoggedIn(user)}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default MainView;
