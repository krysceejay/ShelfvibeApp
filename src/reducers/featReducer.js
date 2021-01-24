import {GET_FEAT_BOOKS, GET_FEAT_BOOKSTORE} from '../actions/types';
  
  const initialState = {
    books: [],
    bookstore: []
  };
  
  const featReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
  
      case GET_FEAT_BOOKS:
        return {
          ...state,
          books: payload,
         };
         
      case GET_FEAT_BOOKSTORE:
        return {
          ...state,
          bookstore: payload,
         };
  
      default:
        return state;
    }
  };
  
  export default featReducer;
  