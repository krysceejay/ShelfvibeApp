import {GET_NOTIFICATIONS, NOT_SEEN_NOTIFICATIONS, SEEN_NOTIFICATIONS, SEND_NOTIFICATION} from './types';
import api from '../utils/api';

//GET USER NOTIFICATION
export const userNotificationAction = () => async dispatch => {
    const query = `
        query {
            getUserNotifications{
            id
            type
            insertedAt
            seen
            club{
                id
                image
                name
                public
                insertedAt
                updatedAt
                description
                genre
                publish
                user{
                    username
                    id
                }
                members{
                    id
                }
                polls{
                    books
                    current
                    pollName
                    id
                }
                lists{
                    title
                    bookcover
                    current
                    id
                }
              }
              senderUser{
                id
                email
                firstName
                lastName
                status
                username
                about
                propix
                insertedAt
              }
            }
          }
      `;
  
    try {
      const userNotification = await api.post('/', {query});
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: userNotification.data.data.getUserNotifications,
      });
    } catch (err) {
      return 'failed';
    }
  };

//GET USER NOT SEEN NOTIFICATION
export const userNotSeenNoteAction = () => async dispatch => {
    const query = `
        query {
            getUserNotSeenNote{
            id
            }
          }
      `;
  
    try {
      const userNotSeenNote = await api.post('/', {query});
      dispatch({
        type: NOT_SEEN_NOTIFICATIONS,
        payload: userNotSeenNote.data.data.getUserNotSeenNote,
      });
    } catch (err) {
      return 'failed';
    }
  }; 
  
  //SET NOTIFICATION SEEN TO TRUE
export const userSeenNoteAction = () => async dispatch => {
    const query = `
        mutation {
            updateNotificationSeen
        }
      `;
    try {
      await api.post('/', {query});
      dispatch({
        type: SEEN_NOTIFICATIONS,
      });
    } catch (err) {
      return 'failed';
    }
  };

  //SEND USER NOTIFICATION
export const sendNotificationAction = notificationInput => async dispatch => {
    const {clubId, receiverUserId, type} = notificationInput;
    const query = `
    mutation CreateClub($clubId: ID!, $receiverUserId: ID!, $type: String!){
        sendNotification(clubId: $clubId, receiverUserId: $receiverUserId, input: {type: $type}){
          id
        }
      }
    `;
    try {
      const sendNote = await api.post('/', {query,
        variables: {
            clubId,
            receiverUserId,
            type
          }
        });
      if (sendNote.data.data.sendNotification !== null) {
        dispatch({
          type: SEND_NOTIFICATION
        });
      } else {
        return 'failed';
      }
    } catch (err) {
      return 'failed';
    }
  }