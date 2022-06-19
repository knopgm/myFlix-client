import React from "react";

export function UserInfo({ username, email }) {
  // console.log(userData);
  return (
    <>
      <h4>Your Infos</h4>
      <p>Name: {username}</p>
      <p>e-mail: {email}</p>
    </>
  );
}
