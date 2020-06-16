import React, { useContext } from "react";
import { ApiContext } from "../context/apiContext";

export const FilterBar = () => {
  const {
    filterSelection,
    handleChange,
    male,
    female,
    all,
    robot,
    search
  } = useContext(ApiContext);
  return (
    <>
      <div className="input-group">
        <button
          name="all"
          className={`btn btn-filter ${all ? "active" : ""}`}
          onClick={filterSelection}
        >
          Show all
        </button>
        <button
          name="male"
          className={`btn btn-filter ${male ? "active" : ""}`}
          onClick={filterSelection}
        >
          Male
        </button>
        <button
          name="female"
          className={`btn btn-filter ${female ? "active" : ""}`}
          onClick={filterSelection}
        >
          Female
        </button>
        <button
          name="robot"
          className={`btn btn-filter ${robot ? "active" : ""}`}
          onClick={filterSelection}
        >
          Robot
        </button>
      </div>

      <input
        type="text"
        id="myInput"
        value={search}
        onChange={handleChange}
        placeholder="Search for names..."
      />

      {/* <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i className="fas fa-search" />
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search for names..."
          aria-label="Search for names..."
          aria-describedby="basic-addon1"
          value={search}
          onChange={handleChange}
        />
      </div> */}
    </>
  );
};
