import {
  SET_LOGIN_STATE,
  LOGOUT,
  STILL_LOGGEDIN,
  USER_SIGNUP,
  USER_UPDATE
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
  //isLoading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        ...payload,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        user: null,
      };

    case STILL_LOGGEDIN:
      return {
        ...state,
        ...payload,
      };

    case USER_SIGNUP:
      return {
        ...state,
        isLoggedIn: false,
      };

    case USER_UPDATE:
      return {
        ...state,
        user: payload
      };  

    default:
      return state;
  }
};

export default authReducer;
