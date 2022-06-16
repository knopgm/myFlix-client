import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export function FavoriteMovies({ favoriteMoviesList }) {
  return (
    <div className="my-card">
      <h2>Favorite Movies</h2>
      {favoriteMoviesList.map((movies) => {
        return (
          <Card key={movies._id}>
            <Card.Img variant="top" src={movies.imageUrl} />
            <Card.Body>
              <Link to={`/movies/${movies._id}`}>
                <Card.Title>{movies.title}</Card.Title>
              </Link>
              <Button variant="secondary" onClick={() => removefav(movies._id)}>
                Remove from List
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
