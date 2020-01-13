import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducers from './users';
import kpiReducers from './kpi';
import myteamReducers from './myTeam';
import myTeamDetailReducers from './myTeamDetail';
import userDetailReducers from './userDetail';
import feedbackReducers from './feedback';
import userKpiStateReducers from './kpiState';
import ActivityReducers from './activity';
import ActivityStatusReducers from './statusActivity';
export default combineReducers({
  authReducer,
  userReducers,
  kpiReducers,
  myteamReducers,
  myTeamDetailReducers,
  userDetailReducers,
  feedbackReducers,
  userKpiStateReducers,
  ActivityReducers,
  ActivityStatusReducers
});
