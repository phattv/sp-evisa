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
const initialState = {
  fees: [],
};

/**
 * +----------+
 * | REDUCERS |
 * +----------+
 */
const fees = (state: Store = initialState, action: Object) => {
  switch (action.type) {
    case actionTypes.UPDATE_FEES: {
      return Object.assign({}, state, {
        fees: action.payload,
      });
    }
    case actionTypes.UPDATE_FEES_SELECTED_COUNTRY: {
      return Object.assign({}, state, {
        countryId: action.payload,
      });
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
export { fees };
