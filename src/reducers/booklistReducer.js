import {FETCH_CLUB_READ_LIST, ADD_BOOKLIST, SET_BOOK, EDIT_BOOKLIST, REMOVE_LIST} from '../actions/types';

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
      case EDIT_BOOKLIST:
        return {
          ...state,
          bookLists: state.bookLists.map(bookList =>
            bookList.id === payload.id ? { ...bookList, title: payload.title, bookcover: payload.bookcover } : bookList
          )
        };  
    case SET_BOOK:
        return {
          ...state,
          bookLists: state.bookLists.map(bookList =>
            bookList.id === payload.id ? { ...bookList, current: payload.current } : bookList
          )
        };
    case REMOVE_LIST:
      return {
          ...state,
          bookLists: state.bookLists.filter(bookList => bookList.id !== payload)
      };   
    
    default:
      return state;
  }
};

export default booklistReducer;
