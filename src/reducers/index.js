import {combineReducers} from 'redux';
import bookReducer from './bookReducer';
import authReducer from './authReducer';
import clubReducer from './clubReducer';

export default combineReducers({
  book: bookReducer,
  auth: authReducer,
  club: clubReducer,
});
