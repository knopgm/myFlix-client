import React from "react";
import { Card, Container } from "react-bootstrap";
import { UserInfo } from "./user-info";
import axios from "axios";
// import { FavoriteMovies } from "./favorite-movies";
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

    return (
      <Container>
        {/* <Row className="justify-content-md-center">
          <Col>
            <CardGroup>
              <Card>
                <Card.Body>
                  <UserInfo name={user.username} email={user.email} />
                  <FavoriteMovies favoriteMoviesList={user.favoriteMovies} /> 
                   <UpdateUser />
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row> */}
      </Container>
    );
  }
}
