/* eslint-disable import/prefer-default-export */
import * as constants from './constants';

export function updateProfile(payload) {
  return { type: constants.UPDATE_PROFILE, payload };
}
