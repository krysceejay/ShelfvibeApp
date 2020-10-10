import {SET_LOGIN_STATE, LOGOUT, STILL_LOGGEDIN} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  userId: '',
  token: '',
  refreshToken: '',
  expiresOn: '',
  data: '',
  //isLoading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload, // this is what we expect to get back from API call and login page input
        //fromLogin: true, // we set this as true on login
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        userId: null,
      };

    case STILL_LOGGEDIN:
      return {
        ...state,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default loginReducer;
