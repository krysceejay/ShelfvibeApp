import {FETCH_BOOKS, USER_BOOKS} from '../actions/types';

const initialState = {
  books: [],
  book: {},
  userBooks: [],
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return {...state, books: action.payload};
    case USER_BOOKS:
      return {...state, userBooks: action.payload};
    default:
      return state;
  }
};

export default bookReducer;
