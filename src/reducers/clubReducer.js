import {FETCH_CLUBS, USER_CLUBS, CREATE_CLUB} from '../actions/types';

const initialState = {
  clubs: [],
  club: {},
  userClubs: [],
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLUBS:
      return {...state, books: action.payload};

    case USER_CLUBS:
      return {...state, userBooks: action.payload};

    case CREATE_CLUB:
      return {
        ...state,
        clubs: action.payload,
      };  
    default:
      return state;
  }
};

export default clubReducer;
