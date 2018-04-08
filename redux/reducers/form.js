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
  stepOne: {},
  stepTwo: {},
  stepThree: {},
};

/**
 * +----------+
 * | REDUCERS |
 * +----------+
 */
const form = (state: Store = initialState, action: Object) => {
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
export { form };
