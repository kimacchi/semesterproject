import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import games from "../reducers/games";
import users from "../reducers/users";
import currentUser from "../reducers/currentUser";
import currentProject from "../reducers/currentProject";

export const store = createStore(combineReducers({
    users,
    games,
    currentUser,
    currentProject
}), applyMiddleware(thunk));
