import { cloneDeep } from 'lodash';
import * as constants from './constants';
import initialState, { initalRequest } from './initialState';

export default function (state = initialState, action) {
  const { type, name, payload } = action;
  const newState = cloneDeep(state);

  switch (type) {
    case constants.START_REQUEST: {
      newState[name] = cloneDeep(initalRequest);
      newState[name].pending = true;
      break;
    }

    case constants.SUCCESS_REQUEST: {
      const request = newState[name];
      request.pending = false;
      request.fullfilled = true;
      request.response = payload;
      break;
    }

    case constants.ERROR_REQUEST: {
      const request = newState[name];
      request.pending = false;
      request.rejected = true;
      request.error = payload;
      break;
    }

    case constants.CLEAR_REQUEST: {
      newState[name] = cloneDeep(initalRequest);
      break;
    }

    default:
      return state;
  }

  return newState;
}
