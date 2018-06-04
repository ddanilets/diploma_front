import { cloneDeep } from 'lodash';
import * as constants from './constants';
import initialState from './initialState';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);
  switch (action.type) {
    case constants.UPDATE_PROFILE:
      newState.profile = Object.assign({}, newState.profile, action.payload);
      return newState;
    default:
      return newState;
  }
}
