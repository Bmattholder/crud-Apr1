import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to="/">List</Link>
        <Link to="/form">Form</Link>
      </div>
    </nav>
  );
}

export default Nav;
