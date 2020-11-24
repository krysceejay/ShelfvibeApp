import {FETCH_CLUB_READ_LIST, ADD_BOOKLIST, SET_BOOK} from '../actions/types';

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
    case SET_BOOK:
        return {
          ...state,
          bookLists: state.bookLists.map(bookList =>
            bookList.id === payload.id ? { ...bookList, current: payload.current } : bookList
          )
        };  
    
    default:
      return state;
  }
};

export default booklistReducer;
