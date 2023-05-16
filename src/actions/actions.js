export const SET_MOVIES = "SET_MOVIES";
export const SET_MOVIES_LIST = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";

export function setMovies(value) {
  console.log("SET_MOVIES action triggered");
  return { type: SET_MOVIES, value };
}

export function setMoviesList(value) {
  console.log("SET_MOVIES_LIST action triggered");
  return { type: SET_MOVIES_LIST, value };
}

export function setFilter(value) {
  console.log("SET_FILTER action triggered");
  return { type: SET_FILTER, value };
}

export function setUser({ _id, birthday, username, email, favoriteMovies }) {
  console.log("SET_USER action triggered");
  return { type: SET_USER, _id, birthday, username, email, favoriteMovies };
}
