import {createStore, combineReducers} from 'redux';
import DrawerReducer from './reducers/DrawerReducer';

const rootReducer = combineReducers({
  drawerReducer: DrawerReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
