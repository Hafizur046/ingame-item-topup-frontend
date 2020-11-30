import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getHeader } from "./authentication/session";

//import Card from "./card";

import API_URL from "./url";
import copy from "copy-to-clipboard";

export default function ({ match, loggedIn, games }) {
  let game = {};
  games.forEach((value) => {
    if (value._id === match.params.id) {
      game = value;
    }
  });

  const [packages, setPackages] = useState([]);

  //hooks for input fields
  const [playerId, setPlayerId] = useState("");
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [password, setPassword] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [accountPlatform, setAccountPlatform] = useState("Facebook");
  const [selectedPackage, setSelectedPackage] = useState("");

  const [buttonClicked, setButtonClicked] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [noPackages, setNoPackages] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("effect has run");
    getPackages();
  }, []);

  useEffect(() => {
    if (buttonClicked) {
      const body = {};
      if (game.type !== "promo") {
        body.accountPlatform = accountPlatform;
        body.emailOrNumber = emailOrNumber;
        body.password = password;
      }

      if (game.type === "promo") {
        body.playerId = playerId;
      }

      body.bkashNumber = bkashNumber;
      body.package = selectedPackage;

      order(body);
    }
  }, [buttonClicked]);

  async function order(body) {
    if (!loggedIn) {
      return;
    }
    try {
      let url = `${API_URL}/order/place`;

      const response = await fetch(url, {
        headers: getHeader(),
        method: "POST",
        body: JSON.stringify(body),
      });

      let resbody = await response.json();

      if (resbody.err) {
        setError(resbody.err);
        setButtonClicked(false);
        return;
      }
      setOrdered(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPackages() {
    try {
      let url = `${API_URL}/get/packages?game=${match.params.id}`;
      let serverResponse = await fetch(url, { method: "GET" });
      let body = await serverResponse.json();
      if (body.length === 0) {
        setNoPackages(true);
      }
      setPackages(body);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  if (noPackages) {
    return <h1>This page is not available yet</h1>;
  }

  if (buttonClicked) {
    if (!loggedIn) {
      return <Redirect to="/login" />;
    }
    if (ordered) {
      if (error === "") {
        return <Redirect to="/orderhistory" />;
      }
      setOrdered(false);
      setButtonClicked(false);
    }
  }
  if (packages.length === 0) {
    return <h1>Loading</h1>;
  }
  if (packages) {
    return (
      <>
        <div className="container"></div>
        <div className="container ">
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-sm-4">
              <p>
                Warning – READ THE DESCRIPTION BEFORE ORDER – ভুল
                নাম্বার/পাসওয়ার্ড দিয়ে অথবা একাউন্ট এ ২ স্টেপ দিয়ে রাখলে আপনার
                অর্ডার কমপ্লিট হতে লেইট হবে ! যারা অন্যদের টপআপ/এয়ারড্রপ কিনে
                দিচ্ছেন তারা অর্ডার করার আগে নিজে লগ ইন করে চ্যাক করুন। নতুবা
                অনুগ্রহ করে অর্ডার করবেন না। এয়ারড্রপ এর সময় মিনিমাম ১ ঘন্টা
                থাকতে হবে।
              </p>
            </div>
            <div className="col">
              {error === "" || (
                <div class="alert alert-danger">
                  <strong>Error!</strong> {error}
                </div>
              )}

              <form action="/action_page.php" className="">
                {game.type === "promo" ? (
                  <div class="form-group">
                    <label for="email">Player Id:</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Player Id"
                      id="email"
                      value={playerId}
                      onChange={(e) => setPlayerId(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label for="sel1">Account Type:</label>
                      <select
                        class="form-control"
                        id="sel1"
                        onChange={(e) => {
                          setAccountPlatform(e.target.value);
                        }}
                      >
                        <option>Facebook</option>
                        <option>Gmail</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="email">Email or Phone:</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter email"
                        id="email"
                        value={emailOrNumber}
                        onChange={(e) => setEmailOrNumber(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <label for="pwd">Password:</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Enter password"
                        id="pwd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <label for="optradio">Select a Package:</label>
                <div className="row">
                  {packages.map((value) => (
                    <>
                      <div className="col">
                        <div
                          class="custom-radio custom-control"
                          style={{ border: "1px solid #ddd", padding: "10px" }}
                        >
                          <input
                            className="custom-control-input"
                            type="radio"
                            name="optradio"
                            id={value._id}
                            selectedPackage={value._id}
                            onChange={(e) => {
                              setSelectedPackage(
                                e.target.getAttribute("selectedPackage")
                              );
                            }}
                          />
                          <label class="custom-control-label" for={value._id}>
                            {value.name}{" "}
                            <i style={{ fontSize: ".8em", color: "red" }}>
                              for {value.price} BDT
                            </i>
                          </label>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <br />

                <div class="alert alert-primary">
                  <p>
                    <strong>Send Money: </strong>017963645720
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      copy("017963645720");
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div class="form-group">
                  <label for="email">Your Bkash Number:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Number"
                    id="email"
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setButtonClicked(true);
                  }}
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>loading</h1>;
  }
}
