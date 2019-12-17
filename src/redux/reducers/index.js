import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducers from './users';
import kpiReducers from './kpi';
import myteamReducers from './myTeam';
import myTeamDetailReducers from './myTeamDetail';
import userDetailReducers from './userDetail';
import feedbackReducers from './feedback';
export default combineReducers({
  authReducer,
  userReducers,
  kpiReducers,
  myteamReducers,
  myTeamDetailReducers,
  userDetailReducers,
  feedbackReducers
});
