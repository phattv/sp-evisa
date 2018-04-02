// @flow
import type { Dispatch } from 'redux';

/**
 * +--------------+
 * | ACTION TYPES |
 * +--------------+
 */
const actionTypes = {
  UPDATE_STEP_ONE: 'UPDATE_STEP_ONE',
  RESET_STEP_TWO: 'RESET_STEP_TWO',
  UPDATE_STEP_TWO: 'UPDATE_STEP_TWO',
  UPDATE_STEP_THREE: 'UPDATE_STEP_THREE',
  UPDATE_FEES: 'UPDATE_FEES',
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
const resetStepTwo = () => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.RESET_STEP_TWO,
    payload: {},
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
const updateFees = (params: Array<Object>) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.UPDATE_FEES,
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
  resetStepTwo,
  updateStepTwo,
  updateStepThree,
  updateFees,
};
