import { getUserInfo } from '../action.type';
import { userInfo } from 'os';

const initUsers =  {};

export default (state= initUsers, action) =>{
  switch(action.type){
    case getUserInfo:
        return action.data;
    default:
        return initUsers;
  };
};