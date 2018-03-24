// @flow
import type { Dispatch } from 'redux';

/**
 * +--------------+
 * | ACTION TYPES |
 * +--------------+
 */
const actionTypes = {
  FINISH_STEP_ONE: 'FINISH_STEP_ONE',
  FINISH_STEP_TWO: 'FINISH_STEP_TWO',
  FINISH_STEP_THREE: 'FINISH_STEP_THREE',
};

/**
 * +---------+
 * | ACTIONS |
 * +---------+
 */
const finishStepOne = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.FINISH_STEP_ONE,
    payload: params,
  });
};
const finishStepTwo = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.FINISH_STEP_TWO,
    payload: params,
  });
};
const finishStepThree = (params: Object) => (dispatch: Dispatch) => {
  return dispatch({
    type: actionTypes.FINISH_STEP_THREE,
    payload: params,
  });
};

/**
 * +---------+
 * | EXPORTS |
 * +---------+
 */
export { actionTypes, finishStepOne, finishStepTwo, finishStepThree };
