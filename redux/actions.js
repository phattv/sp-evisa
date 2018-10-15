// @flow
import type { Dispatch } from 'redux';

/**
 * +--------------+
 * | ACTION TYPES |
 * +--------------+
 */
const actionTypes = {
  UPDATE_STEP_ONE: 'FORM/UPDATE_STEP_ONE',
  RESET_STEP_TWO: 'FORM/RESET_STEP_TWO',
  UPDATE_STEP_TWO: 'FORM/UPDATE_STEP_TWO',
  UPDATE_STEP_THREE: 'FORM/UPDATE_STEP_THREE',
  UPDATE_PRICE: 'FORM/UPDATE_PRICE',
  UPDATE_PAYMENT_STATUS: 'FORM/UPDATE_PAYMENT_STATUS',
  UPDATE_FEES: 'FEES/UPDATE_FEES',
  UPDATE_FEES_SELECTED_COUNTRY: 'FEES/UPDATE_FEES_SELECTED_COUNTRY',
  UPDATE_ACCOUNT: 'ACCOUNT/UPDATE_ACCOUNT',
  LOGOUT: 'ACCOUNT/LOGOUT',
  UPDATE_GUEST: 'GUEST/UPDATE_GUEST',
};

/**
 * +---------+
 * | ACTIONS |
 * +---------+
 */
const updateStepOne = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.UPDATE_STEP_ONE,
    payload: params,
  });
};
const updateStepTwo = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.UPDATE_STEP_TWO,
    payload: params,
  });
};
const updateStepThree = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.UPDATE_STEP_THREE,
    payload: params,
  });
};
const updatePrice = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.UPDATE_PRICE,
    payload: params,
  });
};
const updateFees = (params: Array<Object>) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.UPDATE_FEES,
    payload: params,
  });
};
const updateFeesSelectedCountry = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.UPDATE_FEES_SELECTED_COUNTRY,
    payload: params,
  });
};
const updateAccount = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.UPDATE_ACCOUNT,
    payload: params,
  });
};
const updateGuest = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.UPDATE_GUEST,
    payload: params,
  });
};
const logout = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.LOGOUT,
    payload: params,
  });
};

/**
 * +---------+
 * | EXPORTS |
 * +---------+
 */
export {
  actionTypes,
  updateStepOne,
  updateStepTwo,
  updateStepThree,
  updatePrice,
  updateFees,
  updateFeesSelectedCountry,
  updateAccount,
  updateGuest,
  logout,
};
