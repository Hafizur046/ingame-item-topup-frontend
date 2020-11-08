import React, { useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { setHeader } from "./authentication/session";
const API_URL = "http://localhost:80/api";

export default function ({ setUser, setLoggedIn, loggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [buttonClicked, setButtonClicked] = useState(false);

  const [error, setError] = useState("");

  //const [user, setUser] = useState("");

  useEffect(() => {
    if (buttonClicked) {
      console.log("buttonis clicked");
      let body = {};
      body.username = username;
      body.password = password;

      signup(body);
    }
  }, [buttonClicked]);

  async function signup(body) {
    let url = `${API_URL}/auth/login`;

    let reqbody = new FormData();

    for (var k in body) {
      reqbody.append(k, body[k]);
    }

    const response = await fetch(url, {
      // headers: headers,
      headers: {
        "Content-Type": "application/json",
      },
      //mode: "no-cors",
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log("the header is :", response.headers);
    let resbody = await response.json();

    setHeader(resbody);

    if (resbody.err) {
      setError(resbody.err);
      setButtonClicked(false);
    } else {
      setLoggedIn(true);
    }
  }
  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    //{loggedIn}
    //{loggedIn || <Redirect to="/" />}
    <form
      className="container mt-50"
      style={{
        marginTop: "50px",
      }}
    >
      {error === "" || (
        <div class="alert alert-danger">
          <strong>Error!</strong> {error}
        </div>
      )}
      <div class="form-group">
        <label for="usr">Username:</label>
        <input
          type="text"
          class="form-control"
          id="usr"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input
          type="password"
          class="form-control"
          id="pwd"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="submit"
          value="Login"
          class="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            setButtonClicked(true);
          }}
        />
      </div>
    </form>
  );
}
