import React from "react";
import { connect } from "react-redux";
import { Card, Container, Row, Col } from "react-bootstrap";
import { UserInfo } from "./user-info";
import axios from "axios";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import { setUser } from "../../actions/actions";

class ProfileView extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   userData: null,
    // };
  }

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
        // Assign the result to the state
        // this.setState({
        //   userData: response.data,
        // });
        this.props.setUser(response.data);
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
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={4}>
            <Card>
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
          <Col>
            <FavoriteMovies
              favoriteMoviesList={user.favoriteMovies}
              movies={movies}
              username={user.username}
              onFavoriteMovieRemoved={() => {
                this.getUserByUsername();
              }}
            />
          </Col>
        </Row>
      </Container>
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
