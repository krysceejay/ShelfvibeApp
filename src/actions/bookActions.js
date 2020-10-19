import {Alert} from 'react-native';
import {FETCH_BOOKS} from './types';
import api from '../utils/api';

export const fetchBooks = () => async dispatch => {
  const query = `
      query {
          allbooks{
            author
            bookcover
            description
            genre
            id
            slug
            meetingDetails
            public
            published
            title
            user{
              username
            }
            topics{
              topicText
              topicStatus
            }
            ratings{
              comment
              rating
              updatedAt
              user{
                username
              }
            }
          }
        }
    `;

  try {
    const allbooks = await api.post('/', {query});
    dispatch({
      type: FETCH_BOOKS,
      payload: allbooks.data.data.allbooks,
    });
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry.',
    );
    return 'failed';
  }
};
