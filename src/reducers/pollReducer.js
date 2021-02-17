import {ADD_POLL, FETCH_CLUB_POLLS, SET_POLL, FETCH_POLL_VOTES, 
    VOTE_POLL, REMOVE_VOTE, EDIT_POLL, REMOVE_POLL, CLUB_CURRENT_POLL} from '../actions/types';

const initialState = {
  polls: [],
  currentpoll: {},
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
    case CLUB_CURRENT_POLL:
        return {
          ...state,
          currentpoll: payload,
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
    case EDIT_POLL:
        return {
         ...state,
         polls: state.polls.map(poll =>
            poll.id === payload.id ? { ...poll, books: payload.books, pollName: payload.pollName } : poll
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
    case REMOVE_VOTE:
        return {
            ...state,
            votes: state.votes.filter(vote => vote.id !== payload)
        };
    case REMOVE_POLL:
        return {
            ...state,
            polls: state.polls.filter(poll => poll.id !== payload)
        };
    default:
      return state;
  }
};

export default pollReducer;
