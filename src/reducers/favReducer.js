import {FAV_CLUB, UNFAV_CLUB, FAV_BY_USER_CLUB} from '../actions/types';
  
  const initialState = {
    getUserFavClubs: null,
    userFavClub: false
  };
  
  const favReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
  
      case FAV_CLUB:
        return {
          ...state,
          userFavClub: true
         };
  
      case UNFAV_CLUB:
        return {
          ...state,
          userFavClub: false
         };

      case FAV_BY_USER_CLUB:
        return {
          ...state,
          userFavClub: true
         };
  
      default:
        return state;
    }
  };
  
  export default favReducer;
  