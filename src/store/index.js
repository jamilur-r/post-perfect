import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import postReducer from "./postReducer";

const reducers = combineReducers({
  posts: postReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["feedback"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
