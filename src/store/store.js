import { configureStore } from "@reduxjs/toolkit";

import { languageReducer } from "./slice/language";
import {favMoviesReducer} from "./slice/favMovies";

const store = configureStore({
  reducer: {
    language: languageReducer,
    favMovies: favMoviesReducer,
  },
});

export default store;
