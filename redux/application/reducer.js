import { cloneDeep } from 'lodash';
import * as constants from './constants';
import initialState from './initialState';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);

  switch (action.type) {
    case constants.UPDATE_ROUTER_STATE: {
      newState.prevRouterState = newState.routerState;
      newState.routerState = cloneDeep(action.payload);
      break;
    }
    default:
      break;
  }

  return newState;
}
