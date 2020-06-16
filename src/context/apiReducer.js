import {
  SHOW_LOADER,
  FETCH_HEROES,
  FETCH_MORE_HEROES,
  FILTER,
  SEARCH,
  FETCH_HERO,
  FETCH_HOME_WORLD,
  FETCH_FILMS,
  FAVOURITE
} from "./types";

const handlers = {
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [FAVOURITE]: (state, { payload }) => ({
    ...state,
    hero: {
      ...state.hero,
      isFavourite: payload
    }
  }),
  [FETCH_HEROES]: (state, { payload }) => ({
    ...state,
    heroes: payload.results,
    next: payload.next,
    loading: false
  }),
  [FETCH_HERO]: (state, payload) => ({
    ...state,
    hero: payload.payload,
    homeUrl: payload.payload.homeworld,
    filmsUrl: payload.payload.films,
    loading: false
  }),
  [FETCH_FILMS]: (state, payload) => ({
    ...state,
    films: payload.payload,
    loading: false
  }),
  [FETCH_HOME_WORLD]: (state, payload) => ({
    ...state,
    homeWorld: payload.payload,
    loading: false
  }),
  [FETCH_MORE_HEROES]: (state, { payload }) => ({
    ...state,
    heroes: state.heroes.concat(payload.data.results),
    next: payload.data.next,
    loading: false,
    hasMore: payload.hasMore
  }),
  [FILTER]: (state, { payload }) => ({
    ...state,
    male: payload.male,
    female: payload.female,
    robot: payload.robot,
    all: payload.all
  }),
  [SEARCH]: (state, { payload }) => ({
    ...state,
    search: payload
  }),
  DEFAULT: state => state
};

export const apiReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
