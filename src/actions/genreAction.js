import {Alert} from 'react-native';
import {GET_ALL_GENRES} from './types';
import api from '../utils/api';

export const getAllGenres = () => async dispatch => {
    const query = `
        query {
            allgenre{
            id
            name
            }
         }
      `;
  
    try {
      const allGenres = await api.post('/', {query});
      dispatch({
        type: GET_ALL_GENRES,
        payload: allGenres.data.data.allgenre,
      });
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  };