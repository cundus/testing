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
import ActivityChatReducers from './activityChat';
import AchievementReducers from './achivement';
import AppraisalReducers from './appraisal';
import notificationReducers from './notifications';
import monitoringReducers from './monitoring';
import {
  ownKpi, managerKpi, saveKpi, submitKpi
} from './kpi/';

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
  ActivityStatusReducers,
  ActivityChatReducers,
  AchievementReducers,
  AppraisalReducers,
  ownKpi,
  managerKpi,
  saveKpi,
  submitKpi,
  notificationReducers,
  monitoringReducers
});
