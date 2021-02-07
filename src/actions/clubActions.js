import {Alert} from 'react-native';
import {FETCH_CLUBS, CREATE_CLUB, FILTER_CLUB, 
  CREATE_MEMBER, FETCH_CLUB_MEMBERS, 
  SINGLE_CLUB, UPDATE_CLUB_PUBLIC, UPDATE_CLUB_PUBLISH, REPORT_CLUB,
  SET_MEMBER, REMOVE_MEMBER, CHECK_MEMBER, GET_USER_CLUBS, UPDATE_CLUB,
  DELETE_CLUB, USER_JOINED_CLUBS, LEAVE_CLUB} from './types';
import api from '../utils/api';
import {fileUpload, removeFile} from '../utils/fileUpload';


//FETCH ALL CLUBS
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

// GET USER ADDED CLUBS
export const getUserClubs = id => async dispatch => {
  const query = `
      query {
        user(id: ${id}){
          clubs{
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
        }
      }
  `;

  try {
    const userClubs = await api.post('/', {query});
    dispatch({
      type: GET_USER_CLUBS,
      payload: userClubs.data.data.user.clubs,
    });
  } catch (err) {
    return 'failed';
  }
};

// GET USER JOINED CLUBS
export const getUserJoinedClubs = () => async dispatch => {
  const query = `
      query {
        getJoinedClub{
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
        }
      }
    `;

  try {
    const userJoinedClubs = await api.post('/', {query});
    dispatch({
      type: USER_JOINED_CLUBS,
      payload: userJoinedClubs.data.data.getJoinedClub,
    });
  } catch (err) {
    return 'failed';
  }
};

//Add Club
export const createClub = clubInput => async dispatch => {
  const {clubname, clubgenre, photo, isPublish, isPublic, clubdescription} = clubInput;
  let img;
  let cgen;

  if (clubgenre.length == 0) {
    cgen = null;
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
          'Some error occured, please try again.',
        );
        return 'failed';
      }
    }else{
      img = "noimage.png";
    }

  const query = `
  mutation CreateClub($clubname: String!, $cgen: [String!], $img: String!, $clubdescription: String!, $isPublic: Boolean!, $isPublish: Boolean!) {
    createClub(input: {name: $clubname, public: $isPublic, publish: $isPublish, image: $img, genre: $cgen, description: $clubdescription}){
      result{
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
        payload: createUserClub.data.data.createClub.result
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

//UPDATE CLUB
export const updateClubAction = clubInput => async dispatch => {
  const {clubId, clubname, clubgenre, photo, clubPhoto, isPublish, isPublic, clubdescription} = clubInput;
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
            if(clubPhoto !== "noimage.png"){
              await removeFile('club', clubPhoto);
            }
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
          'Some error occured, please try again.',
        );
        return 'failed';
      }
    }else{
      img = clubPhoto;
    }

  const query = `
  mutation UpdateClub($clubId: ID!, $clubname: String!, $cgen: [String!], $img: String!, $clubdescription: String!, $isPublic: Boolean!, $isPublish: Boolean!) {
    updateClub(clubId: $clubId, input: {name: $clubname, public: $isPublic, publish: $isPublish, image: $img, genre: $cgen, description: $clubdescription}){
      result{
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
    const updateUserClub = await api.post('/', {query, 
      variables: {
        clubId,
        clubname,
        cgen,
        isPublish,
        isPublic,
        clubdescription,
        img
      }
    });
    if (updateUserClub.data.data.updateClub.successful === true) {
      dispatch({
        type: UPDATE_CLUB,
        payload: updateUserClub.data.data.updateClub.result
      });
    } else {
      const errorMessages = updateUserClub.data.data.updateClub.messages;
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
        id
        user{
          id
          username
          propix
        }
        status
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
        payload: createMember.data.data.createMember.result
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

export const fetchClubMembers = clubId => async dispatch => {
  const query = `
      query {
          getClubMembers(clubId: ${clubId}){
            id
          user{
            id
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

 //Set Member Status
 export const setMemberStatusAction = memberInput => async dispatch => {
  const {userid, clubid} = memberInput;
  const query = `
      mutation {
        setMemberStatus(clubId: ${clubid}, userId: ${userid}){
          id
          user{
            id
            username
            propix
          }
        status
        }
      }
  `;
  try {
    const setMemberStatus = await api.post('/', {query});
    if (setMemberStatus.data.data.setMemberStatus !== null) {
      dispatch({
        type: SET_MEMBER,
        payload: setMemberStatus.data.data.setMemberStatus
      });
    } else {
      Alert.alert(
        'Error',
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

//Remove Member Action
export const removeMemberAction = memberId => async dispatch => {
  const query = `
      mutation {
        removeMember(memberId: ${memberId}){
          id
          user{
            id
            username
            propix
          }
          status
        }
      }
  `;
  try {
    const removeMember = await api.post('/', {query});
    if (removeMember.data.data.removeMember !== null) {
      dispatch({
        type: REMOVE_MEMBER,
        payload: removeMember.data.data.removeMember.id
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
          publish
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
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry.',
    );
    return 'failed';
  }
}

  //Check If User Is Member
  export const checkMemberClub = clubId => async dispatch => {
    const query = `
        query {
          checkIfUserIsMember(clubId: ${clubId})
        }
    `;
    try {
      const checkMember = await api.post('/', {query});
        dispatch({
          type: CHECK_MEMBER,
          payload: checkMember.data.data.checkIfUserIsMember
        });
       
    } catch (err) {
      Alert.alert(
        'Error',
        'Some error occured, please check your internet connection and retry.',
      );
      return 'failed';
    }
  }

//DELETE CLUB ACTION
export const deleteClubAction = clubId => async dispatch => {
  const query = `
      mutation {
        deleteClub(clubId: ${clubId}){
           id
           image
          }
        }
  `;
  try {
    const deleteClub = await api.post('/', {query});
    if (deleteClub.data.data.deleteClub !== null) {
      if(deleteClub.data.data.deleteClub.image !== "noimage.png"){
        await removeFile('club', deleteClub.data.data.deleteClub.image);
      }
      dispatch({
        type: DELETE_CLUB,
        payload: deleteClub.data.data.deleteClub.id
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

//Remove Member Action
export const leaveClubAction = clubId => async dispatch => {
  const query = `
      mutation {
        leaveClub(clubId: ${clubId}){
          club{
              id
            }
          }
      }
  `;
  try {
    const leaveClub = await api.post('/', {query});
    if (leaveClub.data.data.leaveClub !== null) {
      dispatch({
        type: LEAVE_CLUB,
        payload: leaveClub.data.data.leaveClub.club.id
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

