/* global window */
/* eslint-disable global-require */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { merge } from 'lodash';
import reducer from './index';

export default function configureStore(baseHistory, initialState = {}) {
  const reduxRouterMiddleware = routerMiddleware(baseHistory);
  const middleware = applyMiddleware(reduxRouterMiddleware, thunk);

  let configuredState = initialState;
  if (!initialState.environment) {
    configuredState = merge({}, initialState);
  }

  if (!initialState.routing) {
    configuredState = merge(
      {
        routing: {
          location: baseHistory.location,
        },
      },
      initialState,
    );
  }

  let enhancer = middleware;
  if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    enhancer = compose(middleware, window.devToolsExtension());
  }

  const store = createStore(reducer, configuredState, enhancer);

  return { store };
}
