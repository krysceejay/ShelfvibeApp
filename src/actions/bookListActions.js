import {Alert} from 'react-native';
import {FETCH_CLUB_READ_LIST, ADD_BOOKLIST, SET_BOOK, EDIT_BOOKLIST, REMOVE_LIST} from './types';
import api from '../utils/api';
import {fileUpload, removeFile} from '../utils/fileUpload';

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
          //console.log(error);
          Alert.alert(
            'Error',
            'Some error occured, please try again.',
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

 //Edit Book To List
 export const editBookToList = bookInput => async dispatch => {
  const {clubId, listId, booktitle, bookcover, bookcovername} = bookInput;
  let img;

  if(bookcover !== null) {
        try {
          const uploadImage = await fileUpload(bookcover, 'bookcover');
          if(uploadImage.status == 200){
            await removeFile('bookcover', bookcovername);
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
      img = bookcovername;
    }

  const query = `
  mutation UpdateList($clubId: ID!, $listId: ID!, $img: String!, $booktitle: String!) {
    updateList(clubId: $clubId, listId: $listId, input: {title: $booktitle, bookcover: $img}){
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
    const editList = await api.post('/', {query, 
      variables: {
        clubId,
        listId,
        booktitle,
        img
      }
    });
    if (editList.data.data.updateList.successful === true) {
      dispatch({
        type: EDIT_BOOKLIST,
        payload: editList.data.data.updateList.result
      });
    } else {
      const errorMessages = editList.data.data.updateList.messages;
      Alert.alert(
        'Error',
        'Please make sure you provide the required fields',
      );
      return errorMessages;
    }
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry.',
    );
    return 'failed';
  }
};

//Remove Book Action
export const removeListAction = listId => async dispatch => {
  const query = `
      mutation {
        removeList(listId: ${listId}){
           id
           bookcover
          }
        }
  `;
  try {
    const removeList = await api.post('/', {query});
    if (removeList.data.data.removeList !== null) {
      await removeFile('bookcover', removeList.data.data.removeList.bookcover);
      dispatch({
        type: REMOVE_LIST,
        payload: removeList.data.data.removeList.id
      });
    } else {
      Alert.alert('Failed', 'Some error occured, please check your internet connection and retry.');
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

  