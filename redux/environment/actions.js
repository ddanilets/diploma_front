/* eslint-disable import/prefer-default-export */
import * as constants from './constants';

export function updateLocation(params) {
  return {
    type: constants.NAVIGATE_SUCCESS,
    payload: {
      params,
    },
  };
}
