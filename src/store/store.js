import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import games from "../reducers/games";
import users from "../reducers/users";

export const store = createStore(combineReducers({
    users,
    games
}), applyMiddleware(thunk));
