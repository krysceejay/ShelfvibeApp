import {FETCH_CLUBS, USER_CLUBS, CREATE_CLUB, FILTER_CLUB, CREATE_MEMBER, ADD_RATING} from '../actions/types';

const initialState = {
  clubs: [],
  club: {},
  userClubs: [],
  filterClub: []
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLUBS:
      return {
        ...state, 
        clubs: action.payload,
        filterClub: action.payload
      };

    case USER_CLUBS:
      return {...state, userClubs: action.payload};

    case CREATE_CLUB:
      return state;

    case FILTER_CLUB:
      return {...state, filterClub: action.payload};

    case CREATE_MEMBER:
      return state;

    case ADD_RATING:
      return state;

    default:
      return state;
  }
};

export default clubReducer;
