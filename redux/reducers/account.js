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
const initialState = {};

/**
 * +----------+
 * | REDUCERS |
 * +----------+
 */
const account = (state: Store = initialState, action: Object) => {
  switch (action.type) {
    case actionTypes.UPDATE_ACCOUNT: {
      return Object.assign({}, state, action.payload);
    }
    case actionTypes.LOGOUT: {
      return {}
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
export { account };
