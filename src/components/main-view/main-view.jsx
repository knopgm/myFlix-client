import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Navbar } from "../navbar/navbar";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  // componentDidMount() {
  //   axios
  //     .get("https://myflix-api-gkm.herokuapp.com/movies")
  //     .then((response) => {
  //       this.setState({
  //         movies: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  getMovies(token) {
    axios
      .get("https://myflix-api-gkm.herokuapp.com/movies", {
        headers: { Authorization: `Bearer${token}` },
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

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    //Before the movies have been loaded:

    //Uncomment this line only if use the code option without ternary operator:
    // if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar />
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        <Row className="justify-content-md-center">
          {selectedMovie ? (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col md={3} key={movie._id}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>

        {/* option without ternary operator:
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(movie) => {
              this.setSelectedMovie(movie);
            }}
          />
        ))} */}
      </div>
    );
  }
}

MainView.propTypes = {
  movie: PropTypes.array,
};

export default MainView;
