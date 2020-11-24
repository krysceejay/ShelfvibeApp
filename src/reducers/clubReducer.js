import {FETCH_CLUBS, USER_CLUBS, CREATE_CLUB, FILTER_CLUB, CREATE_MEMBER, ADD_RATING, FETCH_CLUB_MEMBERS} from '../actions/types';

const initialState = {
  clubs: [],
  club: {},
  userClubs: [],
  filterClub: [],
  members: []
};

const clubReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CLUBS:
      return {
        ...state, 
        clubs: payload,
        filterClub: payload
      };
    case FETCH_CLUB_MEMBERS:
      return {
        ...state, 
        members: payload
      };

    case USER_CLUBS:
      return {...state, userClubs: payload};

    case CREATE_CLUB:
      return state;

    case FILTER_CLUB:
      return {...state, filterClub: payload};

    case CREATE_MEMBER:
      return state;

    case ADD_RATING:
      return state;

    default:
      return state;
  }
};

export default clubReducer;
