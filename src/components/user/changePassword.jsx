import React, { useState } from "react";
import { useEffect } from "react";
import { getHeader } from "../authentication/session";
import API_URL from "../url";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const [buttonClicked, setButtonClicked] = useState(false);

  const [error, setError] = useState("");

  //const [user, setUser] = useState("");

  useEffect(() => {
    if (buttonClicked) {
      console.log("buttonis clicked");
      let body = {};
      body.oldPassword = oldPassword;
      body.newPassword = password;

      changePass(body);
    }
  }, [buttonClicked]);

  async function changePass(body) {
    let url = `${API_URL}/auth/changepassword`;

    const response = await fetch(url, {
      // headers: headers,
      headers: getHeader(), //mode: "no-cors",
      method: "PATCH",
      body: JSON.stringify(body),
    });

    console.log("the header is :", response.headers);
    let resbody = await response.json();
    console.log("the effing resbody is", resbody);

    if (resbody.err) {
      setError(resbody.err);
      setButtonClicked(false);
    } else {
      localStorage.clear();
      return;
    }
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
        <label for="usr">Old Password:</label>
        <input
          type="password"
          class="form-control"
          id="usr"
          required
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="pwd">New Password:</label>
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
          value="Apply"
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
