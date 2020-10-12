import {
  SET_LOGIN_STATE,
  LOGOUT,
  STILL_LOGGEDIN,
  USER_SIGNUP,
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  token: '',
  user: null,
  //isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload,
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
        ...action.payload,
      };

    case USER_SIGNUP:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;
