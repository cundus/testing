import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducers from './users';
import kpiReducers from './kpi';

export default combineReducers({
  authReducer,
  userReducers,
  kpiReducers
});
