import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import environment from './environment/reducer';
import request from './request/reducer';
import application from './application/reducer';
import stages from './stages/reducer';
import project from './project/reducer';

export default combineReducers({
  routing,
  environment,
  request,
  application,
  project,
  stages,
});
