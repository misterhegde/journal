import { combineReducers } from "redux";
import { taskReducer } from "./TasksReducer";

export const rootReducer = combineReducers({ taskReducer });
