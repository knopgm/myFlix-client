import React from "react";
import PropTypes from "prop-types";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <>
        <div className="movie-view">
          <div className="movie-poster">
            <img src={movie.imagePath} />
          </div>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.description}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <div className="genre-infos">
              <span className="sub-label">Name: </span>
              <span className="value">{movie.genre.name}:</span>
              <span className="sub-label">Description: </span>
              <span className="value">{movie.genre.description}</span>
            </div>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <div className="director-infos">
              <span className="sub-label">Name: </span>
              <span className="value">{movie.director.name}:</span>
              <span className="sub-label">Bio: </span>
              <span className="value">{movie.director.bio}</span>
            </div>
          </div>
          <button
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </button>
        </div>
      </>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
