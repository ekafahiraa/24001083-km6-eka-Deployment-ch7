import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import movieReducers from "./reducers/movieReducers";
import searchReducers from "./reducers/searchReducers";
import loginReducers from "./reducers/loginReducers";
import detailReducers from "./reducers/detailReducers";
import registerReducers from "./reducers/registerReducers";
import googleReducers from "./reducers/googleReducers";
import authReducers from "./reducers/authReducers";

const rootReducer = combineReducers({
  movies: movieReducers,
  search: searchReducers,
  login: loginReducers,
  detail: detailReducers,
  register: registerReducers,
  google: googleReducers,
  auth: authReducers,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
