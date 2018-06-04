/* eslint-disable import/prefer-default-export */
import * as constants from './constants';

export function addStage(payload) {
  return { type: constants.ADD_STAGE, payload };
}

export function removeStage(id) {
  return { type: constants.DELETE_STAGE, payload: id };
}

export function editStage(payload) {
  return { type: constants.EDIT_STAGE, payload };
}

