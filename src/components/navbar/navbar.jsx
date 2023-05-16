import React, { useMemo } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";

import "./navbar.css";

export function NavBar(props) {
  const { user, onLoggedOut } = props;
  const isAuth = useMemo(() => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  }, []);

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          My Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-end flex-grow-1" navbarScroll>
            {isAuth && (
              <Nav.Link
                className="navbar-username"
                href={`/users/${user.username}`}
              >
                {user.username}
              </Nav.Link>
            )}
            {isAuth && (
              <Button variant="link" onClick={() => onLoggedOut()}>
                Logout
              </Button>
            )}
            {!isAuth && <Nav.Link href="/login">Login</Nav.Link>}
            {!isAuth && <Nav.Link href="/register">Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
