import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

export function UpdateUser(props) {
  const { onUserUpdated } = props;

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(props.email);
  const [birthday, setBirthday] = useState(props.birthday);

  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validate = () => {
    let isReq = true;

    if (!password) {
      setPasswordErr("Password is required");
      isReq = false;
    } else if (password.length < 4) {
      setPasswordErr("Password must be 4 characters long");
      isReq = false;
    }
    if (!email.includes("@")) {
      setEmailErr("Not a valid Email");
    }

    return isReq;
  };

  function emptyUpdateStates() {
    window.open(`/users/${props.username}`, "_self");
  }

  function handleSubmitedUpdate(e) {
    e.preventDefault();
    const isReq = validate();
    const accessToken = localStorage.getItem("token");
    const url = `https://myflix-api-gkm.herokuapp.com/users/${props.username}`;
    if (isReq) {
      /* Send a request to the server for registration */
      axios
        .put(
          url,
          {
            password: password,
            email: email,
            birthday: birthday,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        .then((response) => {
          const data = response.data;
          onUserUpdated();
          emptyUpdateStates();
          console.log(response);
        })
        .catch((e) => {
          console.log("error updating the user");
          console.log(e);
        });
    }
  }

  return (
    <Form className="profile-form">
      <h4>Update</h4>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          // value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={"6"}
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
          // defaultValue={email}
        />
        {emailErr && <p>{emailErr}</p>}
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        // type="submit"
        style={{ marginTop: "20px" }}
        onClick={handleSubmitedUpdate}
      >
        Update
      </Button>
    </Form>
  );
}
