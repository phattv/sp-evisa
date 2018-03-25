// @flow
// vendor
import type { Store } from 'redux';
// custom
import { actionTypes } from './actions';
import { initialState } from './store';

/**
 * +----------+
 * | REDUCERS |
 * +----------+
 */
const reducer = (state: Store = initialState, action: Object) => {
  switch (action.type) {
    case actionTypes.FINISH_STEP_ONE: {
      return Object.assign({}, state, {
        stepOne: action.payload,
      });
    }
    case actionTypes.FINISH_STEP_TWO: {
      return Object.assign({}, state, {
        stepTwo: {...state.stepTwo, ...action.payload},
      });
    }
    case actionTypes.FINISH_STEP_THREE: {
      return Object.assign({}, state, {
        stepThree: action.payload,
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
export { reducer };
