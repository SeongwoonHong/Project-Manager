import { combineReducers } from 'redux';
import projectReducer from './project';
import appReducer from './app';
import cardReducer from './cards';
import laneReducer from './lanes';

export default combineReducers({
  Project: projectReducer,
  App: appReducer,
  Cards: cardReducer,
  Lanes: laneReducer,
});

