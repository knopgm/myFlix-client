import React from "react";
import { connect } from "react-redux";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import "./navbar.scss";

export function NavBar(props) {
  const { user, onLoggedOut } = props;

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="light"
      expand="lg"
      variant="light"
      // style={{ width: inherit }}
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          My Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${user.username}`}>
                {user.username}
              </Nav.Link>
            )}
            {isAuth() && (
              <Button
                variant="link"
                onClick={() => {
                  onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/login">Login</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
// const mapStateToProps = (state) => {
//   const { user } = state;
//   return { user };
// };

// export default connect(mapStateToProps)(NavBar);
