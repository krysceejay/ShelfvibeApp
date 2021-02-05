import {GET_NOTIFICATIONS, NOT_SEEN_NOTIFICATIONS, SEEN_NOTIFICATIONS} from '../actions/types';
  
  const initialState = {
    notifications: [],
    notSeenNote: [],
    notification: {}
  };
  
  const notificationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
  
    case GET_NOTIFICATIONS:
        return {
            ...state, 
            notifications: payload
         };

    case NOT_SEEN_NOTIFICATIONS:
        return {
            ...state, 
            notSeenNote: payload
         };

    case SEEN_NOTIFICATIONS:
        return {
            ...state, 
            notSeenNote: []
         };
  
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  