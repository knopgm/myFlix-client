import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useParams } from "react-router-dom";

export function DirectorView({ onGoBackButtonClick }) {
  const [director, setDirector] = useState(null);

  let { name } = useParams();

  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      getDirectorByName(accessToken);
    }
  }, []);

  function getDirectorByName(token) {
    const url = `https://myflix-api-gkm.herokuapp.com/director/${name}`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        setDirector(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (director !== null) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Director: {director.name}</Card.Title>
          <Card.Title> Bio: {director.bio}</Card.Title>

          <Button onClick={onGoBackButtonClick}>Back</Button>
        </Card.Body>
      </Card>
    );
  } else {
    return <div></div>;
  }
}
