import {Alert} from 'react-native';
import {ADD_POLL, FETCH_CLUB_POLLS, SET_POLL, FETCH_POLL_VOTES, VOTE_POLL, REMOVE_VOTE} from './types';
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

 //FETCH CLUB POLLS 
  export const fetchClubPolls = id => async dispatch => {
    const query = `
        query {
            clubpolls(clubId: ${id}){
            books
            current
            pollName
            id
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

  //Set Poll Status
export const setPollAction = pollInput => async dispatch => {
    const {clubid, pollId} = pollInput;
    const query = `
        mutation {
            setPollStatus(clubId: ${clubid}, pollId: ${pollId}){
            books
            current
            pollName
            id
          }
        }
    `;
    try {
      const setPoll = await api.post('/', {query});
      if (setPoll.data.data.setPollStatus !== null) {
        dispatch({
          type: SET_POLL,
          payload: setPoll.data.data.setPollStatus
        });
      } else {
        Alert.alert('Failed', 'You already have an active poll. Please deactivate it to proceed.');
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

  export const fetchPollVotes = id => async dispatch => {
    const query = `
        query {
            getPollVotes(pollId:${id}){
              user{
                username
                id
              }
              pollIndex
              id
            }
          }
      `;
    try {
      const pollVotes = await api.post('/', {query});
      dispatch({
        type: FETCH_POLL_VOTES,
        payload: pollVotes.data.data.getPollVotes,
      });
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  };
  
//Vote Action
export const pollVoteAction = voteInput => async dispatch => {
    const {pollId, pollIndex} = voteInput;
    const query = `
        mutation {
            votePoll(pollId: ${pollId}, input: {pollIndex: ${pollIndex}}){
            user{
                username
                id
             }
            pollIndex
            id
          }
        }
    `;
    try {
      const pollVote = await api.post('/', {query});
      if (pollVote.data.data.votePoll !== null) {
        dispatch({
          type: VOTE_POLL,
          payload: pollVote.data.data.votePoll
        });
      } else {
        Alert.alert('Failed', 'You have voted already, please remove your previous vote to vote another.');
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

//Remove Vote Action
export const removeVoteAction = voteId => async dispatch => {
    const query = `
        mutation {
            removeVote(voteId: ${voteId}){
            user{
                username
                id
             }
            pollIndex
            id
          }
        }
    `;
    try {
      const removeVote = await api.post('/', {query});
      if (removeVote.data.data.removeVote !== null) {
        dispatch({
          type: REMOVE_VOTE,
          payload: removeVote.data.data.removeVote.id
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
  