import {ADD_POLL, FETCH_CLUB_POLLS} from '../actions/types';

const initialState = {
  polls: [],
  poll: {},
};

const pollReducer = (state = initialState, action) => {
    const { type, payload } = action;
  switch (type) {
    case FETCH_CLUB_POLLS:
        return {
          ...state,
          polls: payload,
        };
    case ADD_POLL:
        return {
          ...state,
          polls: [payload, ...state.polls],
        };
    default:
      return state;
  }
};

export default pollReducer;
