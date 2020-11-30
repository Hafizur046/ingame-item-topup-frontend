import React from "react";
import { Link } from "react-router-dom";
import {
  Jumbotron,
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";

export default function Header({ loggedIn }) {
  return (
    <>
      <Navbar
        bg="dark"
        text="white"
        navbar="dark"
        expand="lg"
        className="navbar-dark"
      >
        <Container>
          <Navbar.Brand href="/">Msk Topup</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/">
                <Nav.Link href="/">Home</Nav.Link>
              </Link>
              {!loggedIn || (
                <>
                  <Link to="/orderhistory">
                    <Nav.Link href="/orderhistory">Order History </Nav.Link>
                  </Link>
                  <Link to="/changepassword">
                    <Nav.Link href="/changepassword">Change Password</Nav.Link>{" "}
                  </Link>
                  <Link to="/logout">
                    <Nav.Link href="/Logout">Logout</Nav.Link>
                  </Link>
                </>
              )}

              {loggedIn || (
                <NavDropdown
                  title="User"
                  bg="dark"
                  id="basic-nav-dropdown"
                  className="bg-dark"
                  //style={{ color: "#fff !important" }}
                >
                  <NavDropdown.Item bg="dark" href="/register">
                    <Link to="/register">Register </Link>
                  </NavDropdown.Item>
                  <Link to="/login">
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Jumbotron className="text-center bg-dark jumbotron-fluid mb-0 ">
        <div className="container">
          <h1 className="text-white">Msk Topup</h1>
          <p className="text-white">Welcome to msk topup!</p>
        </div>
      </Jumbotron>
    </>
  );
}
