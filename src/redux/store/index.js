// External
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import combineReducers from '../reducers';

const middlewares = [thunk];

const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(...middlewares);

export default createStore(
  combineReducers, composeEnhanchers(middleware)
);
