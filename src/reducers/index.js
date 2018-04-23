import { combineReducers } from 'redux';
import projectReducer from './project';
import appReducer from './app';

export default combineReducers({
  Project: projectReducer,
  App: appReducer,
});

