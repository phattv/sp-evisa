// @flow
// vendor
import { combineReducers } from 'redux';
// custom
import { form } from './form';
import { fees } from './fees';
import { reducerNames } from '../../constants/reducerNames';

const reducers = {
  [reducerNames.form]: form,
  [reducerNames.fees]: fees,
};
const rootReducer = combineReducers({ ...reducers });

/**
 * +---------+
 * | EXPORTS |
 * +---------+
 */
export { rootReducer };
