import React, { Fragment, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ApiContext } from "../context/apiContext";
import { Loader } from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { FilterBar } from "../components/FilterBar";

export const PeopleList = () => {
  const {
    loading,
    heroes,
    fetchHeroes,
    fetchMoreHeroes,
    hasMore,
    male,
    female,
    all,
    robot,
    search
  } = useContext(ApiContext);

  useEffect(() => {
    fetchHeroes();
    // eslint-disable-next-line
  }, []);

  // make -- payload.id --
  let HeroesArr = Object.keys(heroes).map(key => {
    return {
      ...heroes[key],
      id: key
    };
  });

  let gender = "";
  if (!all) {
    if (male) {
      gender = "male";
    } else if (female) {
      gender = "female";
    } else if (robot) {
      gender = "n/a";
    }
    HeroesArr = HeroesArr.filter(hero => hero.gender === gender);
  }
  if (search.length > 0) {
    HeroesArr = HeroesArr.filter(hero => {
      if (hero.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
        return hero;
      } else {
        return null;
      }
    });
  }

  let load = true;
  if (HeroesArr.length < 1) {
    load = false;
  }
  // console.log(HeroesArr);
  return (
    <Fragment>
      <h1>Heroes List:</h1>
      <hr />
      <FilterBar />

      <ul className="list-group">
        {loading ? (
          <Loader />
        ) : (
          <div>
            {
              <InfiniteScroll
                dataLength={heroes.length}
                next={fetchMoreHeroes}
                hasMore={hasMore}
                loader={
                  load ? (
                    <Loader />
                  ) : (
                    <div className="alert alert-warning" role="alert">
                      No results...
                    </div>
                  )
                }
              >
                {HeroesArr.map(hero => (
                  <li className="list-group-item person" key={hero.id}>
                    {hero.name}
                    <NavLink
                      className="btn btn-info btn-sm"
                      to={`/details?${hero.url.split("/")[5]}`}
                      exact
                    >
                      Hero Details
                    </NavLink>
                  </li>
                ))}
              </InfiniteScroll>
            }
          </div>
        )}
      </ul>
    </Fragment>
  );
};
