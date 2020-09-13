import { combineReducers } from "redux";
import { taskReducer } from "./TasksReducer";
import { createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ task: taskReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
