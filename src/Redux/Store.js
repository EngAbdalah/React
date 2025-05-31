import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import combineReducer from "./Reducers/combineReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  combineReducer,composeWithDevTools(applyMiddleware(thunk))
);

export default store;

