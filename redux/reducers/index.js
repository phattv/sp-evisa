// @flow
// vendor
import { combineReducers } from 'redux';
import type { Store } from 'redux';
// custom
import { form, formInitialState } from './form';
import { fees, feesInitialState } from './fees';
import { account, accountInitialState } from './account';
import { reducerNames } from '../../constants/reducerNames';
import { actionTypes } from '../actions';

/**
 * +---------------+
 * | INITIAL STATE |
 * +---------------+
 */
const initialState = {
  [reducerNames.form]: formInitialState,
  [reducerNames.fees]: feesInitialState,
  [reducerNames.account]: accountInitialState,
};

/**
 * +----------+
 * | REDUCERS |
 * +----------+
 */
const reducers = {
  [reducerNames.form]: form,
  [reducerNames.fees]: fees,
  [reducerNames.account]: account,
};
const combinedReducer = combineReducers(reducers);

const rootReducer = (state: Store = initialState, action: Object) => {
  if (action.type === actionTypes.LOGOUT) {
    return initialState;
  }

  return combinedReducer(state, action);
};

/**
 * +---------+
 * | EXPORTS |
 * +---------+
 */
export { rootReducer };
