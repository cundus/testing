import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducers from './users';
import kpiReducers from './kpi';
import myteamReducers from './myTeam';
import myTeamDetailReducers from './myTeamDetail';
export default combineReducers({
  authReducer,
  userReducers,
  kpiReducers,
  myteamReducers,
  myTeamDetailReducers
});
