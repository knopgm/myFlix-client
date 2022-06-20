import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useParams } from "react-router-dom";

export function GenreView({ onGoBackButtonClick }) {
  const [genre, setGenre] = useState(null);

  let { name } = useParams();

  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      getGenreByName(accessToken);
    }
  }, []);

  function getGenreByName(token) {
    const url = `https://myflix-api-gkm.herokuapp.com/genre/${name}`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        setGenre(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (genre !== null) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Genre: {genre.name}</Card.Title>
          <Card.Title> Description: {genre.description}</Card.Title>

          <Button onClick={onGoBackButtonClick}>Back</Button>
        </Card.Body>
      </Card>
    );
  } else {
    return <div></div>;
  }
}
