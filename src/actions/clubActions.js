import {Alert} from 'react-native';
import {FETCH_CLUBS, CREATE_CLUB, FILTER_CLUB} from './types';
import api from '../utils/api';
import fileUpload from '../utils/fileUpload';

export const fetchClubs = () => async dispatch => {
  const query = `
      query {
        allclubs{
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

//Add Club
export const createClub = clubInput => async dispatch => {
  const {name, genre, photo, isPublish, isPublic, description} = clubInput;
  let img;
  if(photo !== null) {
        try {
          const uploadImage = await fileUpload(photo, 'club');
          if(uploadImage.status == 200){
            img = uploadImage.data.data;
          }else{
            Alert.alert(
              'Error',
              'Some error occured, file may be too lage.',
            );
            return 'failed';
          }
      } catch (error) {
        Alert.alert(
          'Error',
          'Some error occured, file may be too lage.',
        );
        return 'failed';
      }
    }else{
      img = "noimage.jpg";
    }

  const query = `
  mutation CreateClub($name: String!, $genre: [String!], $img: String!, $description: String!, $isPublic: Boolean!, $isPublish: Boolean!) {
    createClub(input: {name: $name, public: $isPublic, publish: $isPublish, image: $img, genre: $genre, description: $description}){
      result{
        name
        image
        public
        user{
          username
        }
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
    const createUserClub = await api.post('/', {query, 
      variables: {
        name,
        genre,
        isPublish,
        isPublic,
        description,
        img
      }
    });
    if (createUserClub.data.data.createClub.successful === true) {
      
      dispatch({
        type: CREATE_CLUB,
      });
    } else {
      const errorMessages = createUserClub.data.data.createClub.messages;
      Alert.alert(
        'Creating club Failed',
        'Please make sure you provide the required data',
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

export const filterClub = (text, clubs) => async dispatch => {
    let filteredClub = clubs.filter(item => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    dispatch({
      type: FILTER_CLUB,
      payload: filteredClub,
    });
};

