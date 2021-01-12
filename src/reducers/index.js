import {combineReducers} from 'redux';
import bookReducer from './bookReducer';
import authReducer from './authReducer';
import clubReducer from './clubReducer';
import pollReducer from './pollReducer';
import booklistReducer from './booklistReducer';
import favReducer from './favReducer';
import rateReducer from './rateReducer';
import genreReducer from './genreReducer';

export default combineReducers({
  book: bookReducer,
  auth: authReducer,
  club: clubReducer,
  poll: pollReducer,
  booklist: booklistReducer,
  fav: favReducer,
  rate: rateReducer,
  genre: genreReducer
});
