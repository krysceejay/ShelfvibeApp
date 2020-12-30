import {GET_CLUB_RATINGS, ADD_RATING, UPDATE_RATING, CHECK_RATING} from '../actions/types';

const initialState = {
  ratings: [],
  hasRated: false
};

const rateReducer = (state = initialState, action) => {
    const { type, payload } = action;
  switch (type) {
    case GET_CLUB_RATINGS:
        return {
          ...state,
          ratings: payload,
        };

    case ADD_RATING:
        return {
          ...state,
          ratings: [payload, ...state.ratings],
          hasRated: true
        };
        
    case UPDATE_RATING:
        return {
          ...state,
          ratings: state.ratings.map(rating =>
            rating.id === payload.id ? { ...rating, rating: payload.rating, comment: payload.comment } : rating
         ),
         hasRated: true,
        };

    case CHECK_RATING:
        return {
          ...state,
          hasRated: payload,
        };
    
    default:
      return state;
  }
};

export default rateReducer;
