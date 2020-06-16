import React, { Fragment, useContext, useEffect } from "react";
import { ApiContext } from "../context/apiContext";
import { Loader } from "./Loader";

export const Planets = () => {
  const { loading, homeWorld, homeUrl, fetchHomeWorld } = useContext(
    ApiContext
  );
  useEffect(() => {
    fetchHomeWorld();
    // eslint-disable-next-line
  }, [homeUrl]);
  return (
    <Fragment>
      <h4>Planet:</h4>
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Home World:</th>
              <th scope="col">Population:</th>
              <th scope="col">Climate:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{homeWorld.name}</td>
              <td>{homeWorld.population}</td>
              <td>{homeWorld.climate}</td>
            </tr>
          </tbody>
        </table>
      )}
    </Fragment>
  );
};
