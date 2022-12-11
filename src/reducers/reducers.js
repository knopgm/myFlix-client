import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  SET_MOVIES_LIST,
  SET_USER,
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      console.log("SET_FILTER reducer reached");
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log("SET_MOVIES reducer reached");
      return action.value;
    default:
      return state;
  }
}

function moviesList(state = [], action) {
  switch (action.type) {
    case SET_MOVIES_LIST:
      console.log("SET_MOVIES_LIST reducer reached");
      console.log(state);
      return action.value;
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      console.log("SET_USER reducer reached", { action });
      return action.value;
    default:
      return state;
  }
}

// combinerReducer with a Redux built-in function:
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  moviesList,
  user,
});

// combineReducers in details:
// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action),
//   };
// }

export default moviesApp;
