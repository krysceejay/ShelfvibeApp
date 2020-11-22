import {Alert} from 'react-native';
import {ADD_POLL, FETCH_CLUB_POLLS} from './types';
import api from '../utils/api';

//Add Poll
export const addPoll = pollInput => async dispatch => {
    const {clubId, pollname, pollbooks} = pollInput;
    const query = `
  mutation CreatePoll($clubId: ID!, $pollname: String!, $pollbooks: [String!]) {
    createPoll(clubId: $clubId, input: {pollName: $pollname, books: $pollbooks}){
      result{
        books
        pollName
        current
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
      const addClubPoll = await api.post('/', {query,
        variables: {
            clubId,
            pollname,
            pollbooks
          }
        });
      if (addClubPoll.data.data.createPoll.successful === true) {
        dispatch({
          type: ADD_POLL,
          payload: addClubPoll.data.data.createPoll.result
        });
      } else {
        const errorMessages = addClubPoll.data.data.createPoll.messages;
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
  }

  export const fetchClubPolls = id => async dispatch => {
    const query = `
        query {
            clubpolls(clubId: ${id}){
            books
            current
            pollName
          }
        }
      `;
    try {
      const polls = await api.post('/', {query});
      dispatch({
        type: FETCH_CLUB_POLLS,
        payload: polls.data.data.clubpolls,
      });
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  };
  