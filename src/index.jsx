import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import "./index.scss";

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container
      // style={{ display: flex, flexDirection: column, alignItems: center }}
      >
        <MainView />
      </Container>
    );
  }
}

//Finds the root of your app
const container = document.getElementById("app-container");

//Tells React to render your app in the root DOM element
const root = createRoot(container);
root.render(<MyFlixApplication />);
