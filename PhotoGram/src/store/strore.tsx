import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import rootReducer from "./reducers";

declare global {
  interface Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Enable Redux DevTools manually
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//creating store
//store cration involves giving the rootreducer and the middlewares
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
