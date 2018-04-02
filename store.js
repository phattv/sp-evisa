// @flow
// vendor
import { createStore, applyMiddleware, compose } from 'redux';
import type { Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// custom
import { reducer } from './reducers';

/**
 * +---------------+
 * | INITIAL STATE |
 * +---------------+
 */
const initialState = {
  stepOne: {},
  stepTwo: {},
  stepThree: {},
  fees: [],
};

/**
 * +------------------------+
 * | MIDDLEWARE & ENHANCERS |
 * +------------------------+
 */
// TODO: add enhancers for redux-persist
const middleware = [];
middleware.push(thunkMiddleware);
const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

/**
 * +-------+
 * | STORE |
 * +-------+
 */
const initialStore = (initialState: Store = initialState) => {
  return createStore(reducer, initialState, composedEnhancers);
};

/**
 * +---------+
 * | EXPORTS |
 * +---------+
 */
export { initialState, initialStore };
