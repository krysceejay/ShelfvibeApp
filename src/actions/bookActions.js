import {Alert} from 'react-native';
import {FETCH_BOOKS, USER_BOOKS} from './types';
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

export const getUserBooks = id => async dispatch => {
  const query = `
      query {
        user(id: ${id}){
          books{
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
      }
  `;

  try {
    const userBooks = await api.post('/', {query});
    if (userBooks.data.data.user !== null) {
      dispatch({
        type: USER_BOOKS,
        payload: userBooks.data.data.user.books,
      });
    } else {
      Alert.alert('Error', 'User does not exist.');
      return 'failed';
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry.',
    );
    return 'failed';
  }
};

// export const getSingleBook = bookid => async dispatch => {
//   const query = `
//       query {
//         user(id: ${bookid}){
//           books{
//             title
//             author
//             bookcover
//           }
//         }

//       }
//   `;

//   try {
//     const userBooks = await api.post('/', {query});
//     if (userBooks.data.data.user !== null) {
//       dispatch({
//         type: USER_BOOKS,
//         payload: userBooks.data.data.user.books,
//       });
//     } else {
//       Alert.alert('Error', 'User does not exist.');
//       return 'failed';
//     }
//   } catch (error) {
//     Alert.alert(
//       'Error',
//       'Some error occured, please check your internet connection and retry.',
//     );
//     return 'failed';
//   }
// };
