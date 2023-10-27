import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="login">login</NavLink>
          </li>
          <li>
            <NavLink to="signup">sign up</NavLink>
          </li>
          <li>
            <NavLink to="pins">pins</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
