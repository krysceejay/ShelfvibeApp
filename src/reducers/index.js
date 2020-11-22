import {combineReducers} from 'redux';
import bookReducer from './bookReducer';
import authReducer from './authReducer';
import clubReducer from './clubReducer';
import pollReducer from './pollReducer';
import booklistReducer from './booklistReducer';

export default combineReducers({
  book: bookReducer,
  auth: authReducer,
  club: clubReducer,
  poll: pollReducer,
  booklist: booklistReducer,
});
