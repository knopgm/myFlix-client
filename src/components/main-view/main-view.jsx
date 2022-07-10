import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// #0
import { setMovies } from "../../actions/actions";
// we haven't written this one yet

/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/
import MoviesList from "../movies-list/movies-list";

import { LoginView } from "../login-view/login-view";
import { NavBar } from "../navbar/navbar";

import { MovieInfos } from "../movie-view/movie-infos";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";

// #2 export keyword removed from here
class MainView extends React.Component {
  constructor() {
    super();

    // #3 movies state removed from here
    this.state = {
      // movies: [],
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
        // this.setState({
        //   movies: response.data,
        // });

        // #4
        this.props.setMovies(response.data);
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
    window.open("/", "_self");
  }

  onLoggedOut() {
    localStorage.clear();
    window.open("/", "self");
  }

  render() {
    // #5 movies is extracted from this.props rather than from the this.state
    const { movies } = this.props;
    const { user } = this.state;
    // const { movies } = this.state;
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
              <MoviesList
                user={user}
                // #6
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

// #7
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

// #8
export default connect(mapStateToProps, { setMovies })(MainView);
