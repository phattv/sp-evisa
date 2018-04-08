// @flow
// vendor
import { REHYDRATE } from 'redux-persist/constants';
import type { Store } from 'redux';
// custom

const initialState = {};

const persistStore = (state: Store = initialState, action: Object) => {
  switch (action.type) {
    case REHYDRATE: {
      const { form } = action.payload;
      if (form) {
        return Object.assign({}, state, form);
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export { persistStore };
