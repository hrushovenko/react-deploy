import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
    <div className="navbar-brand">Star Wars App</div>

    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact>
          People List
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/favourites">
          Favourites
        </NavLink>
      </li>
    </ul>
  </nav>
);
