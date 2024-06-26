import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

const persistConfig = {
  key: "react-typescript-ui",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;

export const persistor = persistStore(store);
