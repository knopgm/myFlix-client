import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: "1em" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      <Row>
        {filteredMovies.map((m) => (
          <Col md={3} key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const { visibilityFilter, movies } = state;
  return { visibilityFilter, movies };
};

export default connect(mapStateToProps)(MoviesList);
