import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { UserInfo } from "./user-info";
import axios from "axios";
import { FavoriteMovies } from "./favorite-movies";
// import { UpdateUser } from "./update-user";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");

    if (accessToken !== null) {
      const username = localStorage.getItem("user");
      this.getUserByUsername(accessToken, username);
    }
  }

  getUserByUsername(token, username) {
    const url = `https://myflix-api-gkm.herokuapp.com/users/${username}`;

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          userData: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { userData } = this.state;
    const { movies } = this.props;
    // console.log(userData, movies);

    if (userData === null) {
      return <div>usuario nao existe</div>;
    }

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <UserInfo username={userData.username} email={userData.email} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            <Card>
              <Card.Body>
                <UserInfo username={userData.username} email={userData.email} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <FavoriteMovies
              favoriteMoviesList={userData.favoriteMovies}
              movies={movies}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
