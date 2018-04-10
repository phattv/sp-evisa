// @flow
// vendor
import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';
// custom
import { rootReducer } from './reducers';

/**
 * +------------------------+
 * | MIDDLEWARE & ENHANCERS |
 * +------------------------+
 */
const middleware = [];
middleware.push(thunkMiddleware);
const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  autoRehydrate(),
);

/**
 * +-------+
 * | STORE |
 * +-------+
 */
const configureStore = (initialState: Store) => {
  const store = createStore(rootReducer, initialState, composedEnhancers);
  persistStore(store, { storage: localForage });

  return store;
};

/**
 * +---------+
 * | EXPORTS |
 * +---------+
 */
export { configureStore };
