import {ADD_POLL, FETCH_CLUB_POLLS, SET_POLL, FETCH_POLL_VOTES, VOTE_POLL} from '../actions/types';

const initialState = {
  polls: [],
  poll: {},
  votes: []
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
    case SET_POLL:
        return {
         ...state,
         polls: state.polls.map(poll =>
            poll.id === payload.id ? { ...poll, current: payload.current } : poll
         )
        };
    case FETCH_POLL_VOTES:
        return {
            ...state,
            votes: payload,
        };
    case VOTE_POLL:
        return {
            ...state,
            votes: [payload, ...state.votes],
        };
    default:
      return state;
  }
};

export default pollReducer;
