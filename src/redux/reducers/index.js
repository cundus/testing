import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducers from './users';
import myteamReducers from './myTeam';
import draft from './kpiPlanning';

export default combineReducers({
  authReducer,
  userReducers,
  draft,
  myteamReducers
});
