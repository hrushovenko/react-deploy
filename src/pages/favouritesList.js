import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

export const favouritesList = () => {
  const entries = { ...localStorage };
  const favHeroes = Object.entries(entries);
  return (
    <Fragment>
      <h1>Favourites List</h1>
      <hr />
      {favHeroes.map(hero => (
        <li className="list-group-item person" key={hero[0]}>
          {hero[1]}
          <NavLink
            className="btn btn-info btn-sm"
            to={`/details?${hero[0]}`}
            exact
          >
            Hero Details
          </NavLink>
        </li>
      ))}
    </Fragment>
  );
};
