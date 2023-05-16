import React from "react";
import axios from "axios";
import { Button, Stack } from "react-bootstrap";

import "./user-info.css";

export function UserInfo({ username, email, birthday }) {
  const onDeletingUserGoTo = () => {
    localStorage.clear();
    window.open("/");
  };

  const handlingDeletedUser = (username) => {
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
    <Stack className="user-info__wrapper">
      <div>
        <h4>Your Infos</h4>
        <p>Name: {username}</p>
        <p>e-mail: {email}</p>
        <p>Birthday: {birthday}</p>
      </div>

      <div>
        <Button
          variant="secondary"
          onClick={() => handlingDeletedUser(username)}
        >
          Delete Account
        </Button>
      </div>
    </Stack>
  );
}
