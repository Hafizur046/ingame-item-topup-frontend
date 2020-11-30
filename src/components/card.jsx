import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, _id }) {
  return (
    <div className="card" style={{ width: "250px" }}>
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <Link to={"/game/" + _id} className="btn btn-primary">
          See Packages
        </Link>
      </div>
    </div>
  );
}
