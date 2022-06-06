import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export class Navbar extends React.Component {
  render() {
    return (
      <Navbar sticky="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">My Flix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Movies</Nav.Link>
              <Nav.Link href="#link">Profile</Nav.Link>
              <Nav.Link href="#link">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
