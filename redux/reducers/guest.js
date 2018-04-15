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
const guestInitialState = {
  name: '',
  email: '',
  phone: '',
};

/**
 * +----------+
 * | REDUCERS |
 * +----------+
 */
const guest = (state: Store = guestInitialState, action: Object) => {
  switch (action.type) {
    case actionTypes.UPDATE_GUEST: {
      return action.payload;
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
export { guest, guestInitialState };
