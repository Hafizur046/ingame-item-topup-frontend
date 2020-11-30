import React from "react";
import Games from "./games";

export default function ({ games, setGames }) {
  return (
    <>
      <Games games={games} setGames={setGames}></Games>
    </>
  );
}
