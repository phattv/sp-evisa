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
const rootReducer = (state: Store = initialState, action: Object) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEP_ONE: {
      return Object.assign({}, state, {
        stepOne: action.payload,
      });
    }
    case actionTypes.RESET_STEP_TWO: {
      return Object.assign({}, state, {
        stepTwo: {},
      });
    }
    case actionTypes.UPDATE_STEP_TWO: {
      return Object.assign({}, state, {
        stepTwo: { ...state.stepTwo, ...action.payload },
      });
    }
    case actionTypes.UPDATE_STEP_THREE: {
      return Object.assign({}, state, {
        stepThree: action.payload,
      });
    }
    case actionTypes.UPDATE_FEES: {
      return Object.assign({}, state, {
        fees: action.payload
      })
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
export { rootReducer };
