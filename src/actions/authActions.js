import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SET_LOGIN_STATE, LOGOUT, STILL_LOGGEDIN, USER_SIGNUP, USER_UPDATE, UPDATE_PROPIX} from './types';
import api from '../utils/api';
import {fileUpload, removeFile} from '../utils/fileUpload';

export const setLoginState = loginData => {
  return {
    type: SET_LOGIN_STATE,
    payload: loginData,
  };
};

const setLoginLocal = async loginData => {
  try {
    await AsyncStorage.setItem('loginData', JSON.stringify(loginData));
  } catch (err) {
    return 'failed';
  }
};
const updateLocalStorage = async userData => {
  try {
    const storedData = await AsyncStorage.getItem('loginData');
    const storedDataParse = JSON.parse(storedData);
    const newData = {...storedDataParse, user: userData};
    await AsyncStorage.setItem('loginData', JSON.stringify(newData));
  } catch (err) {
    return 'failed';
  }
};

const updateLocalStorageImg = async propix => {
  try {
    const storedData = await AsyncStorage.getItem('loginData');
    const storedDataParse = JSON.parse(storedData);
    const newData = {...storedDataParse, user: { ...storedDataParse.user, propix }};
    await AsyncStorage.setItem('loginData', JSON.stringify(newData));
  } catch (err) {
    return 'failed';
  }
};

export const getLoginLocal = () => async dispatch => {
  try {
    const storedData = await AsyncStorage.getItem('loginData');
    const storedDataParse = JSON.parse(storedData);
    if (storedDataParse !== null) {
      //setAuthToken(storedDataParse.token);
      dispatch({
        type: STILL_LOGGEDIN,
        payload: storedDataParse,
      });
    } else {
      dispatch({
        type: LOGOUT,
      });
    }
  } catch (err) {
    return 'failed';
  }
};

const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('loginData');
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry',
    );
  }
};

export const login = loginInput => async dispatch => {
  const {email, password} = loginInput;
  const query = `
  mutation {
    loginUser(input: {email: "${email}", passwordfield: "${password}"}){
      token
      user{
        id
        email
        firstName
        lastName
        status
        username
        about
        propix
        insertedAt
        updatedAt
        role {
          name
        }
      }
    }
  }
  `;

  try {
    const loginUser = await api.post('/', {query});
    if (loginUser.data.data.loginUser !== null) {
      const o = {
        token: loginUser.data.data.loginUser.token,
        user: loginUser.data.data.loginUser.user,
        isLoggedIn: true,
      };
      setLoginLocal(o); // storing in local storage for next launch
      dispatch(setLoginState(o)); // dispatch action here
    } else {
      const msg = loginUser.data.errors[0].message;
      Alert.alert('Login Failed', msg);
      return 'failed';
    }
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry',
    );
    return 'failed';
  }
};

// Logout
export const logout = () => async dispatch => {
  removeUserData();
  dispatch({
    type: LOGOUT,
  });
};

//Register User
export const signup = signupInput => async dispatch => {
  const {firstname, lastname, useremail, userName, password} = signupInput;
  const query = `
  mutation {
    registerUser(input: {email: "${useremail}",firstName: "${firstname}",lastName: "${lastname}", passwordfield: "${password}",  username: "${userName}"}){
      result{
        email
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
    const signUpUser = await api.post('/', {query});
    if (signUpUser.data.data.registerUser.successful === true) {
      dispatch({
        type: USER_SIGNUP,
      });
    } else {
      const errorMessages = signUpUser.data.data.registerUser.messages;
      Alert.alert(
        'Signup Failed',
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

//RESEND VERIFICATION CODE
export const resendVerifyAction = email => async () => {
  const query = `
      query {
        resendCode(email: "${email}"){
          email
        }
      }
  `;
  
  try {
    const resendVerify = await api.post('/', {query});
    if (resendVerify.data.data.resendCode !== null) {
      return 'success';
    } else {
      const msg = resendVerify.data.errors[0].message;
      Alert.alert('Verification', msg);
      return 'failed';
    }
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured',
    );
    return 'failed';
  }
};

//NEW PASSWORD
export const enterNewpasswordAction = input => async () => {
  const {useremail, password} = input;
  const query = `
      mutation {
        newPassword(email: "${useremail}", password: "${password}"){
          result{
            email
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
    const newUserPassword = await api.post('/', {query});
    if (newUserPassword.data.data.newPassword.successful === true) {
      return 'success';
    } else {
      const errorMessages = newUserPassword.data.data.newPassword.messages;
      Alert.alert(
        'Password Reset Failed',
        'Please make sure you provide the required data',
      );
      return errorMessages;
    }
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured, please try again.',
    );
    return 'failed';
  }
};

//CHECK VERIFICATION CODE
export const checkVerifyAction = input => async () => {
  const {useremail, token} = input;
  const query = `
    query {
      checkCode(email: "${useremail}", token: "${token}")
    }
  `;

  try {
    const checkVerify = await api.post('/', {query});
    if (checkVerify.data.data.checkCode !== null) {
      const res = checkVerify.data.data.checkCode;
      return res;
    } else {
      const msg = checkVerify.data.errors[0].message;
      Alert.alert('Verification', msg);
      return 'failed';
    }
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured',
    );
    return 'failed';
  }
};

//UPDATE USER
export const updateUserAction = updateInput => async dispatch => {
  const {firstname, lastname, userName, aboutMe} = updateInput;
  const query = `
    mutation UpdateUser($aboutMe: String!, $firstname: String!, $lastname: String!, $userName: String!){
      updateUser(input: {about: $aboutMe, firstName: $firstname, lastName: $lastname, username: $userName}){
        result{
          id
          email
          firstName
          lastName
          status
          username
          about
          propix
          insertedAt
          updatedAt
          role {
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
    const updateUser = await api.post('/', {query,
      variables: {
        firstname, 
        lastname, 
        userName, 
        aboutMe
      }
    });
    if (updateUser.data.data.updateUser.successful === true) {
      updateLocalStorage(updateUser.data.data.updateUser.result); // update local storage
      dispatch({
        type: USER_UPDATE,
        payload: updateUser.data.data.updateUser.result
      });
    } else {
      const errorMessages = updateUser.data.data.updateUser.messages;
      Alert.alert(
        'Update Failed',
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

//UPDATE PROFILE PIX
export const updateProPixAction = photoInput => async dispatch => {
  const {proimage, proimagename} = photoInput;

  if(proimage !== null) {
    try {
      const uploadImage = await fileUpload(proimage, 'profiles');
      if(uploadImage.status == 200){
        const query = `
          mutation {
            updatePropix(input: "${uploadImage.data.data}")
          }
        `;

        try {
          const newPropix = await api.post('/', {query});
          if (newPropix.data.data.updatePropix === true) {
            if(proimagename !== "noimage.png"){
              await removeFile('profiles', proimagename);
            }
            updateLocalStorageImg(uploadImage.data.data);
            dispatch({
              type: UPDATE_PROPIX,
              payload: uploadImage.data.data
            });
          } else {
            Alert.alert(
              'Error',
              'Some error occured, please try again.',
            );
          }
        } catch (err) {
          Alert.alert(
            'Error',
            'Some error occured, please try again.',
          );
          return 'failed';
        }
      }else{
        Alert.alert(
          'Error',
          'Some error occured, file may be too large.',
        );
        return 'failed';
      }
  } catch (err) {
    Alert.alert(
      'Error',
      'Some error occured, please try again.',
    );
    return 'failed';
  }
  }
}

