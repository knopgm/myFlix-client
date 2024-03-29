import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// #0
import { setMovies, setUser } from "../../actions/actions";
// we haven't written this one yet

/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/
import RequireAuth from "../require-auth/require-auth";
import MoviesList from "../movies-list/movies-list";
import { LoginView } from "../login-view/login-view";
import { NavBar } from "../navbar/navbar";
import MovieInfos from "../movie-view/movie-infos";
import { RegistrationView } from "../registration-view/registration-view";
import ProfileView from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { Container } from "react-bootstrap";

// #2 export keyword removed from here
class MainView extends React.Component {
  constructor() {
    super();

    // #3 movies state removed from here
    // this.state = {
    //   // movies: [],
    //   // selectedMovie: null,
    //   // user: null,
    // };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
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

        // #4 Assign the results to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    // this.setState({
    //   user: authData.user.username,
    // });
    this.props.setUser(authData.user);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
    window.open("/", "_self");
  }

  onLoggedOut() {
    localStorage.clear();
    window.open("/login", "_self");
  }

  render() {
    // #5 movies is extracted from this.props rather than from the this.state
    const { user } = this.props;
    // const { user } = this.state;
    // const { movies } = this.state;
    const accessToken = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    return (
      <>
        <NavBar user={user} onLoggedOut={() => this.onLoggedOut()} />
        <Container>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  <AlreadyLogged user={user}>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </AlreadyLogged>
                }
              />

              <Route
                path="/register"
                element={
                  <AlreadyLogged user={user}>
                    <RegistrationView />
                  </AlreadyLogged>
                }
              />

              <Route
                path="/"
                element={
                  <RequireAuth user={user}>
                    <MoviesList />
                  </RequireAuth>
                }
              />

              <Route
                path="/movies/:id"
                element={
                  <RequireAuth>
                    <MovieInfos onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </RequireAuth>
                }
              />

              <Route
                path={`/users/${username}`}
                element={
                  <RequireAuth>
                    <ProfileView />
                  </RequireAuth>
                }
              />

              <Route
                path="/genre/:name"
                element={
                  <RequireAuth>
                    <GenreView
                      onGoBackButtonClick={() => window.history.back()}
                    />
                  </RequireAuth>
                }
              />

              <Route
                path="/directors/:name"
                element={
                  <RequireAuth>
                    <DirectorView
                      onGoBackButtonClick={() => window.history.back()}
                    />
                  </RequireAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </Container>
      </>
    );
  }
}

function AlreadyLogged({ user, accessToken, children }) {
  /**
   * Reference: https://reactrouter.com/docs/en/v6/examples/auth
   * 1. Verify if user is logged in
   * 2. If user is authenticated it navigates to / if
   *    * The route is a public route
   * 3. If user is not authenticated then render children from public route
   */
  const location = useLocation();

  if (accessToken && user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

// #7
let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
    auth: state.auth,
  };
};

// #8
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
