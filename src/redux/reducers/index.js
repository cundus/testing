import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducers from './users';

export default combineReducers({ authReducer, userReducers });
