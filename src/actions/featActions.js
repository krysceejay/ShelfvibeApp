import {Alert} from 'react-native';
import {GET_FEAT_BOOKS, GET_FEAT_BOOKSTORE} from './types';
import api from '../utils/api';

//GET FEATURED BOOKS
export const featBooks = () => async dispatch => {
    const query = `
        query {
            allFeaturedBooks{
            id
            title
            author
            bookcover
            description
            status
            }
        }
      `;
  
    try {
      const books = await api.post('/', {query});
      dispatch({
        type: GET_FEAT_BOOKS,
        payload: books.data.data.allFeaturedBooks,
      });
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  };

//GET FEATURED BOOK STORE
export const featBookstore = () => async dispatch => {
    const query = `
        query {
            allBookstores{
            id
            name
            address
            email
            phone
            description
            displayimg
            status
            }
        }
      `;
  
    try {
      const bookstore = await api.post('/', {query});
      dispatch({
        type: GET_FEAT_BOOKSTORE,
        payload: bookstore.data.data.allBookstores,
      });
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  };