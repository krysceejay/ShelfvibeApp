import {Alert} from 'react-native';
import {FETCH_CLUBS, CREATE_CLUB, FILTER_CLUB, CREATE_MEMBER, ADD_RATING} from './types';
import api from '../utils/api';
import fileUpload from '../utils/fileUpload';

export const fetchClubs = () => async dispatch => {
  const query = `
      query {
        allclubs{
            id
            image
            name
            public
            insertedAt
            updatedAt
            description
            genre
            publish
            rates{
              rating
              comment
              updatedAt
              user{
                username
              }
            }
            user{
              username
            }
            members{
              user{
                username
                propix
              }
              status
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
  const {clubname, clubgenre, photo, isPublish, isPublic, clubdescription} = clubInput;
  let img;
  let cgen;

  if (clubgenre.length == 0) {
    cgen = null
  }else{
    cgen = clubgenre;
  }

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
  mutation CreateClub($clubname: String!, $cgen: [String!], $img: String!, $clubdescription: String!, $isPublic: Boolean!, $isPublish: Boolean!) {
    createClub(input: {name: $clubname, public: $isPublic, publish: $isPublish, image: $img, genre: $cgen, description: $clubdescription}){
      result{
        id
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
        clubname,
        cgen,
        isPublish,
        isPublic,
        clubdescription,
        img
      }
    });
    if (createUserClub.data.data.createClub.successful === true) {
      dispatch({
        type: CREATE_CLUB,
      });
      return createUserClub.data.data.createClub.result.id;
    } else {
      const errorMessages = createUserClub.data.data.createClub.messages;
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

export const filterClub = (text, clubs) => async dispatch => {
    let filteredClub = clubs.filter(item => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    dispatch({
      type: FILTER_CLUB,
      payload: filteredClub,
    });
};

//Add Member
export const createMemberAction = memberInput => async dispatch => {
  const {clubId, status} = memberInput;
  const query = `
  mutation {
    createMember(clubId: ${clubId}, input: {status: ${status}}){
      result{
        user{
          username
        }
        club{
          name
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
  `;
  try {
    const createMember = await api.post('/', {query});
    if (createMember.data.data.createMember.successful === true) {
      dispatch({
        type: CREATE_MEMBER,
      });
    } else {
      Alert.alert(
        'Joining Club Failed',
        'Some error occured, please check your internet connection and retry.',
      );
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

//Rate Club
export const rateClub = rateInput => async dispatch => {
  const {clubId, userRating, userComment} = rateInput;
  const query = `
  mutation {
    createRate(clubId: ${clubId}, input: {rating: ${userRating}, comment: "${userComment}"}){
      result{
        user{
          username
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
