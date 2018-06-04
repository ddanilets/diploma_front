import * as constants from './constants';

export function doRequest(name, promise) {
  return (dispatch) => {
    dispatch(startRequest(name));
    return promise.then((response) => {
      dispatch(successRequest(name, response));
    }).catch((e) => {
      dispatch(errorRequest(name, e));
      throw e;
    });
  };
}

export function startRequest(name) {
  return {
    name,
    type: constants.START_REQUEST,
  };
}
export function successRequest(name, response) {
  return {
    name,
    type: constants.SUCCESS_REQUEST,
    payload: response,
  };
}
export function errorRequest(name, error) {
  return {
    name,
    type: constants.ERROR_REQUEST,
    payload: error,
  };
}

export function clearRequest(name) {
  return {
    name,
    type: constants.CLEAR_REQUEST,
  };
}
