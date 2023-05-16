import React from "react";
import { connect } from "react-redux";
import { Card, Container, Row, Col, Stack } from "react-bootstrap";
import { UserInfo } from "./user-info";
import axios from "axios";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import { setUser } from "../../actions/actions";

import "./profile-view.css";

class ProfileView extends React.Component {
  componentDidMount() {
    this.getUserByUsername();
  }

  getUserByUsername() {
    const accessToken = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    if (!accessToken || !username) {
      return;
    }

    const url = `https://myflix-api-gkm.herokuapp.com/users/${username}`;

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        const { _id, birthday, username, email, favoriteMovies } =
          response.data;
        this.props.setUser({ _id, birthday, username, email, favoriteMovies });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.props;

    if (!user || !user._id) {
      return null;
    }

    return (
      <Stack gap={4} className="pb-4">
        <Row className="g-2 justify-content-md-center">
          <Col xs={12} sm={4}>
            <Card className="user_info">
              <Card.Body>
                <UserInfo
                  username={user.username}
                  email={user.email}
                  birthday={user.birthday}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={8}>
            <Card>
              <Card.Body>
                <UpdateUser
                  username={user.username}
                  email={user.email}
                  birthday={user.birthday}
                  onUserUpdated={() => {
                    this.getUserByUsername();
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <FavoriteMovies
          favoriteMoviesList={user.favoriteMovies}
          movies={movies}
          username={user.username}
          onFavoriteMovieRemoved={() => {
            this.getUserByUsername();
          }}
        />
      </Stack>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps, { setUser })(ProfileView);
