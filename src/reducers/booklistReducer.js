import {FETCH_CLUB_READ_LIST, ADD_BOOKLIST} from '../actions/types';

const initialState = {
  bookLists: [],
  bookList: {}
};

const booklistReducer = (state = initialState, action) => {
    const { type, payload } = action;
  switch (type) {
    case FETCH_CLUB_READ_LIST:
        return {
          ...state,
          bookLists: payload,
        };
    case ADD_BOOKLIST:
        return {
          ...state,
          bookLists: [payload, ...state.bookLists],
        };    
    
    default:
      return state;
  }
};

export default booklistReducer;
