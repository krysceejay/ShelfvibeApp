import {Alert} from 'react-native';
import {FETCH_CLUBS, CREATE_CLUB, FILTER_CLUB, 
  CREATE_MEMBER, ADD_RATING, FETCH_CLUB_MEMBERS, 
  SINGLE_CLUB, UPDATE_CLUB_PUBLIC, UPDATE_CLUB_PUBLISH, REPORT_CLUB} from './types';
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
              'Some error occured, file may be too large.',
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

export const fetchClubMembers = clubId => async dispatch => {
  const query = `
      query {
          getClubMembers(clubId: ${clubId}){
          user{
            username
            propix
          }
          status
        }
      }
    `;
  try {
    const members = await api.post('/', {query});
    dispatch({
      type: FETCH_CLUB_MEMBERS,
      payload: members.data.data.getClubMembers
    });
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry.',
    );
    return 'failed';
  }
};

export const getSingleClub = id => async dispatch => {
  const query = `
    query {
      club(clubId: ${id}){
        id
        public
        publish
        name
      }
    }
  `;

  try {
    const club = await api.post('/', {query});
    if (club.data.data.club !== null) {
      dispatch({
        type: SINGLE_CLUB,
        payload: club.data.data.club,
      });
    } else {
      Alert.alert('Error', 'Club does not exist.');
      return 'failed';
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry.',
    );
    return 'failed';
  }
};

//Update Pubic
export const updateClubPublic = clubId => async dispatch => {
  const query = `
      mutation {
        clubPublic(clubId: ${clubId}){
          id
          public
          publish
          name
        }
      }
  `;
  try {
    const updatePublic = await api.post('/', {query});
    if (updatePublic.data.data.clubPublic !== null) {
      dispatch({
        type: UPDATE_CLUB_PUBLIC,
        payload: updatePublic.data.data.clubPublic
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

//Update Pubish
export const updateClubPublish = clubId => async dispatch => {
  const query = `
      mutation {
        clubPublish(clubId: ${clubId}){
          id
          public
          publish
          name
        }
      }
  `;
  try {
    const updatePublish = await api.post('/', {query});
    if (updatePublish.data.data.clubPublish !== null) {
      dispatch({
        type: UPDATE_CLUB_PUBLISH,
        payload: updatePublish.data.data.clubPublish
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

//Report Club
export const reportClubAction = reportInput => async dispatch => {
  const {clubid, reportSubject, reportBody} = reportInput;
  const query = `
      mutation {
        reportClub(clubId: ${clubid}, input: {body: "${reportBody}", subject: "${reportSubject}"}){
          result{
            body
            subject
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
    const reportClub = await api.post('/', {query});
    if (reportClub.data.data.reportClub.successful === true) {
      dispatch({
        type: REPORT_CLUB
      });
    } else {
      const errorMessages = reportClub.data.data.reportClub.messages;
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
}

