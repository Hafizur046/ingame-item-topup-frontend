import React, { useState, useEffect } from "react";
import MessengerCustomerChat from "react-messenger-customer-chat";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import API_URL from "./components/url";
// import '../public/MoonStore_files/bootstrap.min.css';
// import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style.css";
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
import ChangePassword from "./components/user/changePassword";

let isLoggedIn = false;

if (getHeader()) {
  isLoggedIn = true;
}

function App() {
  //handaling push notification using serviceworker

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [games, setGames] = useState([]);
  useEffect(() => {
    getGames();
  }, []);
  async function getGames() {
    try {
      let url = `${API_URL}/get/games`;
      let serverResponse = await fetch(url, { method: "GET" });
      setGames(await serverResponse.json());
      return;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Router>
        <Header loggedIn={loggedIn}></Header>
        <Switch>
          <Route
            path="/"
            exact
            component={(props) => (
              <Home {...props} games={games} setGames={setGames} />
            )}
          />
          <Route
            path="/register"
            component={() => (
              <Register
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
              ></Register>
            )}
          />
          <Route
            path="/login"
            component={() => (
              <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}></Login>
            )}
          />
          <Route
            path="/game/:id"
            component={(props) => (
              <Packages {...props} loggedIn={loggedIn} games={games} />
            )}
          />
          <Route
            path="/logout"
            component={() => <Logout setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/orderhistory"
            exact
            component={() => <Redirect to="/orderhistory/1" />}
          />
          <Route
            path="/orderhistory/:page"
            isExact={false}
            component={(props) => (
              <OrderHistory {...props} setLoggedIn={setLoggedIn} />
            )}
          />
          <Route path="/changepassword" component={ChangePassword} />
        </Switch>
      </Router>
      <footer class="py-5 bg-dark" style={{ marginTop: "250px" }}>
        <div class="container">
          <p class="m-0 text-center text-white">
            This Page is lisenced under GPL3
          </p>
        </div>
      </footer>
      <MessengerCustomerChat />
    </>
  );
}

export default App;
