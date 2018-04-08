// @flow
// vendor
import { combineReducers } from 'redux';
// custom
import { form } from './form';
import { persistStore } from '../persistStore';

const reducers = {
  form,
  persistStore,
};
const rootReducer = combineReducers({ ...reducers });

/**
 * +---------+
 * | EXPORTS |
 * +---------+
 */
export { rootReducer };
