import {Alert} from 'react-native';
import {GET_CLUB_RATINGS, ADD_RATING, UPDATE_RATING, CHECK_RATING} from './types';
import api from '../utils/api';

 //GET CLUB RATINGS
  export const getClubRatingsAction = id => async dispatch => {
    const query = `
        query {
            getClubRatings(clubId: ${id}){
            id
            user{
             username
             id
            }
            club{
             name
            }
            rating
            comment
            updatedAt
          }
        }
      `;
    try {
      const clubRatings = await api.post('/', {query});
      dispatch({
        type: GET_CLUB_RATINGS,
        payload: clubRatings.data.data.getClubRatings,
      });
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  };

  //ADD Rate Club
export const rateClub = rateInput => async dispatch => {
    const {clubId, userRating, userComment} = rateInput;
    const query = `
    mutation {
      createRate(clubId: ${clubId}, input: {rating: ${userRating}, comment: "${userComment}"}){
        result{
            id
          user{
            username
            id
          }
          club{
            name
          }
          rating
          comment
          updatedAt
        }
        successful
        messages{
          code
          field
          message
        }
      }
    }
    `;
    try {
      const addRating = await api.post('/', {query});
      if (addRating.data.data.createRate.successful === true) {
        dispatch({
          type: ADD_RATING,
          payload: addRating.data.data.createRate.result
        });
      } else {
        const errorMessages = addRating.data.data.createRate.messages;
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
  //UPDATE Rate Club
export const updateRateClub = rateInput => async dispatch => {
    const {clubId, userRating, userComment} = rateInput;
    const query = `
    mutation {
        updateRate(clubId: ${clubId}, input: {rating: ${userRating}, comment: "${userComment}"}){
        result{
            id
          user{
            username
            id
          }
          club{
            name
          }
          rating
          comment
          updatedAt
        }
        successful
        messages{
          code
          field
          message
        }
      }
    }
    `;
    try {
      const updateRating = await api.post('/', {query});
      if (updateRating.data.data.updateRate.successful === true) {
        dispatch({
          type: UPDATE_RATING,
          payload: updateRating.data.data.updateRate.result
        });
      } else {
        const errorMessages = updateRating.data.data.updateRate.messages;
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

  //Check If User Rated Club
export const checkRateClub = clubId => async dispatch => {
    const query = `
        query {
          checkIfUserRated(clubId: ${clubId})
        }
    `;
    try {
      const checkRating = await api.post('/', {query});
        dispatch({
          type: CHECK_RATING,
          payload: checkRating.data.data.checkIfUserRated
        });
       
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  }

 

 