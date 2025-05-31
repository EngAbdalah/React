import { combineReducers } from "redux";
import favoritesReducer from "./FavoritesReducer";
import moviesReducer from "./MoviesReducer";
// Import other reducers as needed

export default combineReducers({
  myFavorites: favoritesReducer,
  myMovies: moviesReducer,
  // Other reducers
});
