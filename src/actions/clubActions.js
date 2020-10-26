import {Alert} from 'react-native';
import {FETCH_CLUBS} from './types';
import api from '../utils/api';

export const fetchClubs = () => async dispatch => {
  const query = `
      query {
        allclubs{
            image
            name
            public
            user{
              username
            }
          }
        }
    `;

  try {
    const allclubs = await api.post('/', {query});
    dispatch({
      type: FETCH_CLUBS,
      payload: allclubs.data.data.allclubs,
    });
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry.',
    );
    return 'failed';
  }
};
