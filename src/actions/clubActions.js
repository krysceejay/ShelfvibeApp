import {Alert} from 'react-native';
import {FETCH_CLUBS, CREATE_CLUB} from './types';
import api from '../utils/api';

export const fetchClubs = () => async dispatch => {
  const query = `
      query {
        allclubs{
            image
            name
            public
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
  let formdata = new FormData();
  formdata.append("photo", photo);
  console.log(formdata);

  fetch()
  const query = `
  mutation CreateClub($name: String!, $genre: [String!], $photo: Upload, $description: String!, $isPublic: Boolean!, $isPublish: Boolean!) {
    createClub(input: {name: $name, public: $isPublic, publish: $isPublish, imageField: $photo, genre: $genre, description: $description}){
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
        photo
      }
    });
    console.log(createUserClub.data.data);
    if (createUserClub.data.data.createClub.successful === true) {
      console.log('yes');
      dispatch({
        type: CREATE_CLUB,
        payload: createUserClub.data.data.createClub.result
      });
    } else {
      console.log('no');
      const errorMessages = createUserClub.data.data.createClub.messages;
      Alert.alert(
        'Creating club Failed',
        'Please make sure you provide the required data',
      );
      return errorMessages;
    }
  } catch (err) {
    console.log(err.message);
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry.',
    );
    return 'failed';
  }
};

