import { combineReducers } from 'redux';
import authReducer from './auth';
import { draft } from './kpiPlanning';

export default combineReducers({ authReducer, draft });
