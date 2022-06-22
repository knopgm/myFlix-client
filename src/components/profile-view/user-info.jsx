import React from "react";
import { Button } from "react-bootstrap";

export function UserInfo({ username, email, birthday }) {
  // console.log(userData);
  return (
    <>
      <h4>Your Infos</h4>
      <p>Name: {username}</p>
      <p>e-mail: {email}</p>
      <p>Birthday: {birthday}</p>
      <Button variant="secondary" onClick={() => console.log("deleting")}>
        Delete Account
      </Button>
    </>
  );
}
