import React, { useState } from "react";
import axios from "axios";

import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username is required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is required");
      isReq = false;
    } else if (password.length < 4) {
      setPasswordErr("Password must be 4 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email is required");
      isReq = false;
    } else if (!email.includes("@")) {
      setEmailErr("Not a valid Email");
      isReq = false;
    }

    return isReq;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      console.log(username, password, email, birthday);
      /* Send a request to the server for registration */
      axios
        .post("https://myflix-api-gkm.herokuapp.com/users", {
          username: username,
          password: password,
          email: email,
          birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((e) => {
          console.log("error registering the user");
          console.log(e);
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Header>Please Register</Card.Header>

                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={"6"}
                      placeholder="Your password must be 6 or more characters"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="Enter your Birthday"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
