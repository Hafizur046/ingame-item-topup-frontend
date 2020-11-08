import React, { useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { setHeader } from "./authentication/session";
const API_URL = "http://localhost:80/api";

export default function ({ setUser, setLoggedIn, loggedIn }) {
  const [username, setUsername] = useState("");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [buttonClicked, setButtonClicked] = useState(false);

  const [error, setError] = useState("");

  //const [user, setUser] = useState("");

  useEffect(() => {
    if (buttonClicked) {
      console.log("buttonis clicked");
      let body = {};
      body.username = username;
      body.email = email;
      body.password = password;
      body.phone = phone;
      body.fullName = fullName;

      signup(body);
    }
  }, [buttonClicked]);

  async function signup(body) {
    let url = `${API_URL}/auth/register`;

    let reqbody = new FormData();

    for (var k in body) {
      reqbody.append(k, body[k]);
    }

    console.log("the fucking body is: ", JSON.stringify(body));
    const response = await fetch(url, {
      // headers: headers,
      headers: {
        "Content-Type": "application/json",
      },
      //mode: "no-cors",
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log("server responded:", response);

    let resbody = await response.json();

    if (resbody.err) {
      setError(resbody.err);
      setButtonClicked(false);
    } else {
      setLoggedIn(true);
      setHeader(resbody);
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
      <div className="form-group">
        <label for="usr">Full Name:</label>
        <input
          type="text"
          class="form-control"
          id="usr"
          required
          value={fullName}
          onChange={(e) => {
            setfullName(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="usr">Email:</label>
        <input
          type="email"
          class="form-control"
          id="usr"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="usr">Phone Number:</label>
        <input
          type="text"
          class="form-control"
          id="usr"
          required
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
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
      <div class="form-group">
        <label for="pwd">Confirm Password:</label>
        <input
          type="password"
          class="form-control"
          id="pwd"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="submit"
          value="Sign UP"
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
