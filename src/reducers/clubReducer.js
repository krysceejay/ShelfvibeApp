import {FETCH_CLUBS, USER_CLUBS} from '../actions/types';

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
    default:
      return state;
  }
};

export default clubReducer;
