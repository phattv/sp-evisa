// @flow
// vendor
import { REHYDRATE } from 'redux-persist/constants';
import type { Store } from 'redux';
// custom

/**
 * +---------------+
 * | INITIAL STATE |
 * +---------------+
 */
const initialState = {};

/**
 * +----------+
 * | REDUCERS |
 * +----------+
 */
const persistStore = (state: Store = initialState, action: Object) => {
  switch (action.type) {
    // any custom reducer rehydration logic here
    case REHYDRATE: {
      return state;
    }
    default:
      return state;
  }
};

/**
 * +---------+
 * | EXPORTS |
 * +---------+
 */
export { persistStore };
