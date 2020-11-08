import React, { useState, useEffect } from "react";
import Card from "./card";

const API_URL = "http://localhost:80/api";

export default function () {
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
