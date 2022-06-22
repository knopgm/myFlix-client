import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export function UserInfo({ username, email, birthday }) {
  const onDeletingUserGoTo = () => {
    localStorage.clear();
    window.open("/");
  };

  const handlingDeletedUser = (username) => {
    console.log("deleting");

    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      return;
    }

    const url = `https://myflix-api-gkm.herokuapp.com/users/${username}`;

    axios
      .delete(url, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(() => {
        onDeletingUserGoTo();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h4>Your Infos</h4>
      <p>Name: {username}</p>
      <p>e-mail: {email}</p>
      <p>Birthday: {birthday}</p>
      <Button variant="secondary" onClick={() => handlingDeletedUser(username)}>
        Delete Account
      </Button>
    </>
  );
}
