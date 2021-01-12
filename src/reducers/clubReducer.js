import {FETCH_CLUBS, USER_CLUBS, CREATE_CLUB, FILTER_CLUB, 
  CREATE_MEMBER, FETCH_CLUB_MEMBERS, SINGLE_CLUB, UPDATE_CLUB_PUBLIC, UPDATE_CLUB_PUBLISH, 
  REPORT_CLUB, SET_MEMBER, REMOVE_MEMBER, CHECK_MEMBER, GET_USER_CLUBS, UPDATE_CLUB, 
  DELETE_CLUB, USER_JOINED_CLUBS} from '../actions/types';

const initialState = {
  clubs: [],
  club: {},
  userClubs: [],
  joinedClub: [],
  filterClub: [],
  members: [],
  isMember: false
};

const clubReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CLUBS:
      return {
        ...state, 
        clubs: payload,
        filterClub: payload
      };
    case FETCH_CLUB_MEMBERS:
      return {
        ...state, 
        members: payload
      };
    case GET_USER_CLUBS:
      return {
        ...state, 
        userClubs: payload
      };
    case USER_JOINED_CLUBS:
      return {
        ...state, 
        joinedClub: payload
      };
    case SET_MEMBER:
      return {
        ...state,
        members: state.members.map(member =>
          member.id === payload.id ? { ...member, status: payload.status } : member
        )
      };
    case REMOVE_MEMBER:
      return {
          ...state,
          members: state.members.filter(member => member.id !== payload)
      };

    case SINGLE_CLUB:
      return {...state, club: payload};
    
    case UPDATE_CLUB_PUBLIC:
      return {
        ...state,
        club: payload
       };

    case UPDATE_CLUB_PUBLISH:
      return {
        ...state,
        club: payload
       };

    case UPDATE_CLUB:
      return {
        ...state,
        userClubs: state.userClubs.map(userClub =>
          userClub.id === payload.id ? payload : userClub
        ),
        club: payload
       };

    case DELETE_CLUB:
      return {
          ...state,
          userClubs: state.userClubs.filter(userClub => userClub.id !== payload)
      };   

    case USER_CLUBS:
      return {...state, userClubs: payload};

    case CREATE_CLUB:
      return {
        ...state,
        userClubs: [payload, ...state.userClubs],
        club: payload
      }

    case FILTER_CLUB:
      return {...state, filterClub: payload};

    case CREATE_MEMBER:
      return {
        ...state,
        members: [payload, ...state.members],
        isMember: true
      };
    case CHECK_MEMBER:
      return {
        ...state,
        isMember: payload,
      };  

    case REPORT_CLUB:
      return state;

    default:
      return state;
  }
};

export default clubReducer;
