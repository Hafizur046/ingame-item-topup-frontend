import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import '../public/MoonStore_files/bootstrap.min.css';
// import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";

//importing components
import Header from "./components/header";
// import Nav from './components/navbar'
// import MainBanner from './components/mainbanner'
import Home from "./components/home";
import Register from "./components/register";
import Packages from "./components/packages";
import Login from "./components/login";
import { getHeader } from "./components/authentication/session";
import Logout from "./components/authentication/logout";
import OrderHistory from "./components/user/orderhistory";

let isLoggedIn = false;

if (getHeader()) {
  isLoggedIn = true;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [user, setUser] = useState({});

  return (
    <>
      <Router>
        <Header loggedIn={loggedIn}></Header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/register"
            component={() => (
              <Register
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                setUser={setUser}
              ></Register>
            )}
          />
          <Route
            path="/login"
            component={() => (
              <Login
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                setUser={setUser}
              ></Login>
            )}
          />
          <Route
            path="/game/:id"
            component={(props) => <Packages {...props} loggedIn={loggedIn} />}
          />
          <Route
            path="/logout"
            component={() => <Logout setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/orderhistory"
            exact
            component={(props) => <Redirect to="/orderhistory/1" />}
          />
          <Route
            path="/orderhistory/:page"
            isExact={false}
            component={(props) => (
              <OrderHistory {...props} setLoggedIn={setLoggedIn} />
            )}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
