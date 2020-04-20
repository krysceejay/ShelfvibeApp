import {OPEN_DRAWER} from '../actions/types';
import {CLOSE_DRAWER} from '../actions/types';

const initialState = {
  isDrawerOpen: false,
};

const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {...state, isDrawerOpen: true};
    case CLOSE_DRAWER:
      return {...state, isDrawerOpen: false};
    default:
      return state;
  }
};

export default DrawerReducer;
