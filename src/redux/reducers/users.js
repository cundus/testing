import { getUserInfo, errGetUserInfo } from '../action.type';

const initUsers = {};

export default (state= initUsers, action) =>{
  switch(action.type){
    case getUserInfo:
      return action.data;
    case errGetUserInfo:
      return action.data;
    default:
      return initUsers;
  }
};