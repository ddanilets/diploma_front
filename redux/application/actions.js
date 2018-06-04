import * as constants from './constants';

export function routeChanged(nextState) {
  return (dispatch) => {
    if (nextState) {
      dispatch({ type: constants.UPDATE_ROUTER_STATE, payload: nextState });
    }
  };
}
