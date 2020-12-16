import {Alert} from 'react-native';
import {FAV_CLUB, UNFAV_CLUB, FAV_BY_USER_CLUB} from './types';
import api from '../utils/api';

//GET FAV BY CLUB AND USER
export const getFavByUserAndClub = clubId => async dispatch => {
    const query = `
        query {
            getFavByUserAndClub(clubId: ${clubId}){
            club{
              id
              name
            }
            user{
              id
              username
            }
          }
        }
      `;
  
    try {
      const favByUserAndClub = await api.post('/', {query});
      if (favByUserAndClub.data.data.getFavByUserAndClub !== null) {
        dispatch({
          type: FAV_BY_USER_CLUB
        });
      } 
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  };

//Fav Action
export const favClubAction = clubId => async dispatch => {
    const query = `
          mutation {
            favClub(clubId: ${clubId}){
              club{
                  id
                  name
                }
                user{
                  id
                  username
                }
            }
          }
    `;
    try {
      const favClub = await api.post('/', {query});
      if (favClub.data.data.favClub !== null) {
        dispatch({
          type: FAV_CLUB
        });
      } else {
        Alert.alert('Failed', 'You have favorite this club already.');
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
  //Remove Fav Action
  export const removeFavClubAction = clubId => async dispatch => {
    const query = `
          mutation {
            unfavClub(clubId: ${clubId}){
              club{
                  id
                  name
                }
                user{
                  id
                  username
                }
            }
          }
    `;
    try {
      const removeFavClub = await api.post('/', {query});
      if (removeFavClub.data.data.unfavClub !== null) {
        dispatch({
          type: UNFAV_CLUB
        });
      } else {
        Alert.alert('Failed', 'You have favorite this club already.');
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
  