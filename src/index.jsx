import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./components/reducers/reducers";
import { devToolsEnhancer } from "redux-devtools-extension";

import MainView from "./components/main-view/main-view";

import "./index.scss";

const store = createStore(moviesApp, devToolsEnhancer());

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

//Finds the root of your app
const container = document.getElementById("app-container");

//Tells React to render your app in the root DOM element
const root = createRoot(container);
root.render(<MyFlixApplication />);
