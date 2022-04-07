import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import games from "../reducers/games";
import users from "../reducers/users";
import currentUser from "../reducers/currentUser";
import currentProject from "../reducers/currentProject";
import currentTodo from "../reducers/currentTodo";

export const store = createStore(combineReducers({
    users,
    games,
    currentUser,
    currentProject,
    currentTodo
}), applyMiddleware(thunk));
