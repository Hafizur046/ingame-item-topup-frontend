import React, { useState, useEffect } from "react";
import Card from "./card";

//const API_URL = "http://localhost:80/api";
import API_URL from "./url";

export default function ({ games, setGames }) {
  if (games) {
    console.log("games are", games);
    return (
      <div className="container card-columns">
        {games.map((value, index) => (
          <Card key={value._id} _id={value._id} name={value.name}></Card>
        ))}
      </div>
    );
  } else {
    return <h1>loading</h1>;
  }
}
