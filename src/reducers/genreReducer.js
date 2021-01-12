import {GET_ALL_GENRES} from '../actions/types';
  
  const initialState = {
    genres: [],
    genre: {}
  };
  
  const genreReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
  
    case GET_ALL_GENRES:
        return {
            ...state, 
            genres: payload
        };
  
      default:
        return state;
    }
  };
  
  export default genreReducer;
  