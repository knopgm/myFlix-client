import React from "react";
import axios from "axios";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { NavBar } from "../navbar/navbar";
import { Movies } from "../movie-card/movies";
import { MovieInfos } from "../movie-view/movie-infos";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null,
    };
  }

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
    localStorage.clear();
    window.open("/", "self");
  }

  render() {
    const { movies, user } = this.state;
    // console.log(genre);

    return (
      <BrowserRouter>
        <NavBar user={user} onLoggedOut={() => this.onLoggedOut()} />
        <Routes>
          <Route
            path="/login"
            element={<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />}
          />
          <Route
            exact
            path="/"
            element={
              <Movies
                user={user}
                movies={movies}
                onLoggedIn={(user) => this.onLoggedIn(user)}
              />
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
          <Route path="/register" element={<RegistrationView />} />
          <Route
            path={`/users/${user}`}
            element={<ProfileView movies={movies} />}
          />
          <Route
            path="/genre/:name"
            element={
              <GenreView onGoBackButtonClick={() => window.history.back()} />
            }
          />
          <Route
            path="/directors/:name"
            element={
              <DirectorView onGoBackButtonClick={() => window.history.back()} />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default MainView;
