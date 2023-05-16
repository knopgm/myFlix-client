import React from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./reducers/reducers";
import { devToolsEnhancer } from "redux-devtools-extension";

import MainView from "./components/main-view/main-view";
import { ErrorBoundary } from "./components/error-boundary/error-boundary";

import "./index.scss";
const username = localStorage.getItem("user");
const user = username ? { username } : null;

const store = createStore(moviesApp, { user: user }, devToolsEnhancer());

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <MainView />
        </Provider>
      </ErrorBoundary>
    );
  }
}

//Finds the root of your app
const container = document.getElementById("app-container");

//Tells React to render your app in the root DOM element
const root = createRoot(container);
root.render(<MyFlixApplication />);
