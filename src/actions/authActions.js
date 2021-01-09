import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SET_LOGIN_STATE, LOGOUT, STILL_LOGGEDIN, USER_SIGNUP} from './types';
import api from '../utils/api';

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
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry',
    );
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
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry',
    );
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
      Alert.alert('Login Failed', 'Username or Password is incorrect');
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
