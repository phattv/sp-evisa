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
const formInitialState = {
  stepOne: {
    countryId: 0,
  },
  stepTwo: {
    quantity: 1,
    applicants: [
      {
        name: '',
        countryId: 0,
        birthday: '',
        gender: '',
        passport: '',
        passportExpiry: '',
      },
    ],
  },
  stepThree: {
    contact: {},
  },
  price: 0,
};

/**
 * +----------+
 * | REDUCERS |
 * +----------+
 */
const form = (state: Store = formInitialState, action: Object) => {
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
    case actionTypes.UPDATE_PRICE: {
      return Object.assign({}, state, {
        price: action.payload,
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
export { form, formInitialState };
