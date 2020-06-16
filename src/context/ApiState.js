import React, { useReducer } from "react";
import axios from "axios";
import { ApiContext } from "./apiContext";
import { apiReducer } from "./apiReducer";
import {
  SHOW_LOADER,
  FETCH_HEROES,
  FETCH_HERO,
  FETCH_MORE_HEROES,
  FILTER,
  SEARCH,
  FETCH_HOME_WORLD,
  FETCH_FILMS,
  FAVOURITE
} from "./types";

export const ApiState = ({ children }) => {
  const initialState = {
    heroes: [],
    favouritesHeroes: [],
    hero: [],
    homeWorld: [],
    homeUrl: "",
    filmsUrl: [],
    films: [],
    next: "",
    isFavourite: false,
    loading: false,
    hasMore: true,
    male: false,
    female: false,
    robot: false,
    all: true,
    search: "",
    location: ""
  };
  const [state, dispatch] = useReducer(apiReducer, initialState);
  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchHeroes = async (url = "https://swapi.dev/api/people/?page=1") => {
    showLoader();
    const res = await axios.get(url);
    const payload = res.data;
    setTimeout(() => {
      dispatch({ type: FETCH_HEROES, payload });
    }, 300);
  };
  const fetchHero = async id => {
    showLoader();
    const url = `http://swapi.dev/api/people/${id}/`;
    const res = await axios.get(url);
    const newPay = res.data;
    let answ = false;
    if (id in localStorage) {
      answ = true;
    }
    const isFavourite = { isFavourite: answ };
    const payload = Object.assign(newPay, isFavourite);
    dispatch({ type: FETCH_HERO, payload });
  };
  const fetchHomeWorld = async () => {
    if (state.homeUrl.length !== 0) {
      showLoader();
      const res = await axios.get(state.homeUrl);
      const payload = res.data;
      dispatch({
        type: FETCH_HOME_WORLD,
        payload
      });
    }
  };
  const fetchFilms = async urls => {
    showLoader();
    var payload = [];
    await urls.forEach(async (url, i) => {
      let response = await axios.get(url);
      payload = payload.concat(response.data);
      if (i === state.filmsUrl.length - 1) {
        dispatch({ type: FETCH_FILMS, payload });
      }
    });
  };
  const fetchMoreHeroes = async () => {
    const res = await axios.get(`${state.next}`);
    let hasMore = true;
    if (res.data.next === null) {
      hasMore = false;
    }
    const payload = {
      data: res.data,
      hasMore
    };
    setTimeout(() => {
      dispatch({ type: FETCH_MORE_HEROES, payload });
    }, 500);
  };
  const handleLS = id => {
    let payload = false;
    let res = localStorage.getItem(id, state.hero.name);
    if (res === null) {
      localStorage.setItem(id, state.hero.name);
      payload = true;
    } else {
      localStorage.removeItem(id);
      payload = false;
    }
    dispatch({ type: FAVOURITE, payload });
  };
  const handleChange = e => {
    const payload = e.target.value;
    dispatch({ type: SEARCH, payload });
  };
  const filterSelection = e => {
    e.preventDefault();
    let payload;
    switch (e.target.name) {
      case "male":
        payload = { male: true, female: false, robot: false, all: false };
        break;
      case "female":
        payload = { male: false, female: true, robot: false, all: false };
        break;
      case "robot":
        payload = { male: false, female: false, robot: true, all: false };
        break;
      case "all":
        payload = { male: false, female: false, robot: false, all: true };
        break;
      default:
        break;
    }
    dispatch({ type: FILTER, payload });
  };

  return (
    <ApiContext.Provider
      value={{
        showLoader,
        fetchHeroes,
        fetchHero,
        fetchMoreHeroes,
        fetchHomeWorld,
        fetchFilms,
        filterSelection,
        handleLS,
        handleChange,
        loading: state.loading,
        heroes: state.heroes,
        hero: state.hero,
        hasMore: state.hasMore,
        male: state.male,
        female: state.female,
        robot: state.robot,
        all: state.all,
        search: state.search,
        homeWorld: state.homeWorld,
        films: state.films,
        filmsUrl: state.filmsUrl,
        homeUrl: state.homeUrl,
        location: state.location,
        isFovourite: state.isFavourite
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
