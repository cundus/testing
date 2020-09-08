import { GET_USER_INFO, ERR_GET_USER_INFO } from '../action.type';

const initUsers = {};

export default (state = initUsers, action) => {
  switch(action.type){
    case GET_USER_INFO:
      return action.data;
    case ERR_GET_USER_INFO:
      return action.data;
    default:
      // return initUsers;
      return { ...state };
  }
};
