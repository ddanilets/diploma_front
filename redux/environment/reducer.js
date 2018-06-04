import { cloneDeep } from 'lodash';
import * as constants from './constants';
import initialState from './initialState';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);
  switch (action.type) {
    case constants.NAVIGATE_SUCCESS:
      newState.language = action.payload.params.language || newState.language;
      newState.country = action.payload.params.country || newState.country;
      return newState;
    default:
      return newState;
  }
}
