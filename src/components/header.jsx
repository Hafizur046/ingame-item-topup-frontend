import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";

export default function Header({ loggedIn }) {
  return (
    <>
      <Jumbotron className="text-center bg-primary jumbotron-fluid mb-0 ">
        <div className="container">
          <h1 className="text-white">Free Fire Diamond Topup</h1>
          <p className="text-white">
            Resize this responsive page to see the effect!
          </p>
        </div>
      </Jumbotron>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand" href="#">
            Home
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              {loggedIn || (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link" href="#">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" href="#">
                      Login
                    </Link>
                  </li>
                </>
              )}
              {!loggedIn || (
                <>
                  <li className="nav-item">
                    <Link to="/orderhistory" className="nav-link" href="#">
                      Order History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link" href="#">
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
