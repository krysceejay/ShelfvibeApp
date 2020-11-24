import {Alert} from 'react-native';
import {FETCH_CLUB_READ_LIST, ADD_BOOKLIST, SET_BOOK} from './types';
import api from '../utils/api';
import fileUpload from '../utils/fileUpload';

export const fetchClubReadList = clubId => async dispatch => {
    const query = `
        query {
            clublists(clubId: ${clubId}){
            title
            bookcover
            current
            id
          }
        }
      `;
    try {
      const readingList = await api.post('/', {query});
      dispatch({
        type: FETCH_CLUB_READ_LIST,
        payload: readingList.data.data.clublists,
      });
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  };

 //Add Book To List
export const addBookToList = bookInput => async dispatch => {
    const {clubId, booktitle, bookcover} = bookInput;
    let img;
  
    if(bookcover !== null) {
          try {
            const uploadImage = await fileUpload(bookcover, 'bookcover');
            if(uploadImage.status == 200){
              img = uploadImage.data.data;
            }else{
              Alert.alert(
                'Error',
                'Some error occured, file may be too large.',
              );
              return 'failed';
            }
        } catch (error) {
          Alert.alert(
            'Error',
            'Some error occured, file may be too large.',
          );
          return 'failed';
        }
      }else{
        Alert.alert(
            'Error',
            'Please upload a book cover',
          );
          return 'failed';
      }
  
    const query = `
    mutation CreateList($clubId: ID!, $img: String!, $booktitle: String!) {
      createList(clubId: $clubId, input: {title: $booktitle, bookcover: $img}){
        result{
         title
         bookcover
         current
         id
        }
        successful
        messages{
          code
          field
          message
        }
      }
    }
    `
  ;
    try {
      const addToList = await api.post('/', {query, 
        variables: {
          clubId,
          booktitle,
          img
        }
      });
      if (addToList.data.data.createList.successful === true) {
        dispatch({
          type: ADD_BOOKLIST,
          payload: addToList.data.data.createList.result
        });
      } else {
        const errorMessages = addToList.data.data.createList.messages;
        Alert.alert(
          'Error',
          'Please make sure you provide the required fields',
        );
        return errorMessages;
      }
    } catch (err) {
        console.log(err);
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  }; 

    //Set Book Status
export const setBookAction = bookInput => async dispatch => {
  const {clubid, bookId} = bookInput;
  const query = `
      mutation {
          setBookStatus(clubId: ${clubid}, listId: ${bookId}){
          title
          bookcover
          current
          id
        }
      }
  `;
  try {
    const setBook = await api.post('/', {query});
    if (setBook.data.data.setBookStatus !== null) {
      dispatch({
        type: SET_BOOK,
        payload: setBook.data.data.setBookStatus
      });
    } else {
      Alert.alert('Failed', 'You already have an active book. Please deactivate it to proceed.');
      return 'failed';
    }
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry.',
    );
    return 'failed';
  }
}