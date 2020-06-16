import React, { Fragment, useContext, useEffect } from "react";
import { ApiContext } from "../context/apiContext";
import { Loader } from "./Loader";

export const Films = () => {
  const { loading, films, filmsUrl, fetchFilms } = useContext(ApiContext);

  useEffect(() => {
    fetchFilms(filmsUrl);
    // eslint-disable-next-line
  }, [filmsUrl]);

  let filmsArr = Object.keys(films).map(key => {
    return {
      ...films[key],
      id: key
    };
  });
  return (
    <Fragment>
      <h4>List of films:</h4>
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">N</th>
              <th scope="col">Film title:</th>
              <th scope="col">Release date:</th>
            </tr>
          </thead>
          {filmsArr.map(film => (
            <tbody key={film.id + 1}>
              <tr>
                <th scope="row">{(parseInt(film.id) + 1).toString()}</th>
                <td>{film.title}</td>
                <td>{film.release_date}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </Fragment>
  );
};
