import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducer from './users';
import kpiReducer from './kpi';
import myteamReducer from './myTeam';
import myTeamDetailReducer from './myTeamDetail';
import userDetailReducer from './userDetail';
import feedbackReducer from './feedback';
import userKpiStateReducer from './kpiState';
import ActivityReducer from './activity';
import ActivityStatusReducer from './statusActivity';
import ActivityChatReducer from './activityChat';
import AchievementReducer from './achivement';
import AppraisalReducer from './appraisal';
import notificationReducer from './notifications';
import monitoringReducer from './monitoring';
import alignmentReducer from './alignment';
import {
  ownKpi, managerKpi, saveKpi, submitKpi
} from './kpi/';
import activeDirectoryReducer from './activeDirectory';

export default combineReducers({
  authReducer,
  userReducer,
  kpiReducer,
  myteamReducer,
  myTeamDetailReducer,
  userDetailReducer,
  feedbackReducer,
  userKpiStateReducer,
  ActivityReducer,
  ActivityStatusReducer,
  ActivityChatReducer,
  AchievementReducer,
  AppraisalReducer,
  ownKpi,
  managerKpi,
  saveKpi,
  submitKpi,
  notificationReducer,
  monitoringReducer,
  alignmentReducer,
  activeDirectoryReducer
});
