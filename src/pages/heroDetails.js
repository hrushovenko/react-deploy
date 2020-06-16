import React, { Fragment, useContext, useEffect } from "react";
import { ApiContext } from "../context/apiContext";
import { Planets } from "../components/Planets";
import { Films } from "../components/Films";

export const HeroDetails = () => {
  const { fetchHero, handleLS, hero } = useContext(ApiContext);
  const id = parseInt(window.location.search.replace("?", ""));

  useEffect(() => {
    fetchHero(id);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h1>Hero details:</h1>
      <hr />
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Favourite</th>
            <th scope="col">Height</th>
            <th scope="col">Mass</th>
            <th scope="col">Haircolor</th>
            <th scope="col">Skincolor</th>
            <th scope="col">EyeColor</th>
            <th scope="col">BirthYear</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{hero.name}</th>
            <td>
              <img
                className="star"
                src={
                  hero.isFavourite
                    ? require("../css/star.png")
                    : require("../css/starEmpty.png")
                }
                alt="Favourite"
                width="30"
                height="30"
                onClick={() => handleLS(id)}
              />
            </td>
            <td>{hero.height} cm</td>
            <td>{hero.mass} kg</td>
            <td>{hero.hair_color}</td>
            <td>{hero.skin_color}</td>
            <td>{hero.eye_color}</td>
            <td>{hero.birth_year}</td>
            <td>{hero.gender}</td>
          </tr>
        </tbody>
      </table>
      <Planets />
      <Films />
    </Fragment>
  );
};
