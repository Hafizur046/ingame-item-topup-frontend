import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getHeader } from "./authentication/session";

//import Card from "./card";

const API_URL = "http://localhost:80/api";

export default function ({ match, loggedIn }) {
  const [packages, setPackages] = useState([]);

  //hooks for input fields
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [password, setPassword] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [accountPlatform, setAccountPlatform] = useState("Facebook");
  const [selectedPackage, setSelectedPackage] = useState("");

  const [buttonClicked, setButtonClicked] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    console.log("effect has run");
    getPackages();
  }, []);

  useEffect(() => {
    if (buttonClicked) {
      const body = {};
      body.emailOrNumber = emailOrNumber;
      body.password = password;
      body.accountPlatform = accountPlatform;
      body.bkashNumber = bkashNumber;
      body.package = selectedPackage;
      order(body);
    }
  }, [buttonClicked]);

  async function order(body) {
    try {
      let url = `${API_URL}/order/place`;
      let reqbody = new FormData();

      for (var k in body) {
        reqbody.append(k, body[k]);
      }

      console.log("requesting with the fucking body:", body);

      const response = await fetch(url, {
        headers: getHeader(),
        method: "POST",
        body: JSON.stringify(body),
      });

      console.log(await response.text());

      setOrdered(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPackages() {
    try {
      let url = `${API_URL}/get/packages?game=${match.params.id}`;
      let serverResponse = await fetch(url, { method: "GET" });
      setPackages(await serverResponse.json());
      return;
    } catch (error) {
      console.log(error);
    }
  }

  if (buttonClicked) {
    if (!loggedIn) {
      return <Redirect to="/login" />;
    }
    if (ordered) {
      return <Redirect to="/orderhistory" />;
    }
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
              <form action="/action_page.php" className="">
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
                <div className="row">
                  {packages.map((value) => (
                    <>
                      <div className="col">
                        <div class="custom-radio custom-control">
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
                            {value.name} for BDT {value.price}
                          </label>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <br />
                <div class="form-group">
                  <label for="email">Bkash Number:</label>
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
