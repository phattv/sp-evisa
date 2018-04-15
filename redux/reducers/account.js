// @flow
// vendor
import type { Store } from 'redux';
// custom
import { actionTypes } from '../actions';

/**
 * +---------------+
 * | INITIAL STATE |
 * +---------------+
 */
const accountInitialState = {};

/**
 * +----------+
 * | REDUCERS |
 * +----------+
 */
const account = (state: Store = accountInitialState, action: Object) => {
  switch (action.type) {
    case actionTypes.UPDATE_ACCOUNT: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
};

/**
 * +---------+
 * | EXPORTS |
 * +---------+
 */
export { account, accountInitialState };
