import { cloneDeep } from 'lodash';
import * as constants from './constants';
import initialState from './initialState';

export default function (state = initialState, { payload: stage, type }) {
  const newState = cloneDeep(state);
  switch (type) {
    case constants.ADD_STAGE:
      newState[stage.id] = stage;
      return newState;
    case constants.DELETE_STAGE:
      delete newState[stage];
      return newState;
    case constants.EDIT_STAGE:
      console.log(stage);
      newState[stage.id] = Object.assign({}, newState[stage.id], stage);
      console.log(newState[stage.id]);
      return newState;
    default:
      return newState;
  }
}
