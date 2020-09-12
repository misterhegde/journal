import { combineReducers } from "redux";
import { taskReducer } from "./TasksReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [taskReducer],
};

export const rootReducer = combineReducers({ taskReducer });

// export default persistReducer(persistConfig, rootReducer);
