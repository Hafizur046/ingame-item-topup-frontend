import React from "react";
import { deleteHeader, getHeader } from "./session";
import { Redirect } from "react-router-dom";
import API_URL from "../url";

export default function ({ setLoggedIn }) {
  deleteHeader();
  let url = `${API_URL}/auth/logout`;
  fetch(url, {
    headers: getHeader(),
    type: "GET",
  });
  setLoggedIn(false);
  return <Redirect to="/" />;
}
