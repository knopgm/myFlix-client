import React from "react";
import { Col, Row, Stack } from "react-bootstrap";
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
    <Stack gap={2} className="py-4">
      <Row>
        <Col>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>

      <Row className="g-2">
        {filteredMovies.map((m) => (
          <Col xs={6} sm={4} lg={2} key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>
    </Stack>
  );
}

const mapStateToProps = (state) => {
  const { visibilityFilter, movies } = state;
  return { visibilityFilter, movies };
};

export default connect(mapStateToProps)(MoviesList);
