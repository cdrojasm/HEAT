/* 
Name: store
Action:
*/

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./reducers";
import { loadState, saveState } from './sessionStorage';


const persistedState = loadState();
const store = createStore(rootReducers, persistedState, composeWithDevTools(applyMiddleware(thunk, logger)));

store.subscribe(() => {
    saveState(store.getState());
});

export default store;