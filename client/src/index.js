import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "./App.css"

// redux persist is used for storing the state in local storage to avoid
// loss of data when refreshing the page
// action types that are used internally by redux-persist:
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// delays the rendering of app's UI until persisted state has been retrieved and saved to redux. 209
import { PersistGate } from "redux-persist/es/integration/react";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// persistReducer function wraps this reducer in such a way that it persist the state 
// to the storage engine defined in persistConfig. if multiple slices then combine them using rootReducer 
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  // now use the persistedReducer only
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // explained below
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate
      loading={<div>loading data</div>}
      persistor={persistStore(store)}
    >
      <App />
    </PersistGate>
  </Provider>
);

/*
  When an action is dispatched in Redux, the middleware provided by Redux 
  Toolkit, specifically the "serializable action" middleware, examines the 
  action to see if it follows the rules of serializability. Actions that 
  meet the requirements of being plain JavaScript objects and only 
  containing serializable data types (e.g., numbers, strings, booleans, 
  arrays, and plain objects) are considered serializable.

  On the other hand, actions that include non-serializable data types like 
  functions, Promises, class instances, or other complex objects that cannot
  be easily converted to JSON are considered non-serializable.

  Basically, persistedReducer will use FLUSH, REHYDRATE etc. under the hood
  as provided in reducer. Therefore we ignore these actions for serialization.
*/