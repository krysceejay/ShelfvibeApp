import axios from 'axios';
import {Alert} from 'react-native'; // to show alerts in app
import AsyncStorage from '@react-native-community/async-storage';
import {SET_LOGIN_STATE, LOGOUT, STILL_LOGGEDIN} from './types';

const url = 'https://shelfvibe.com/api/graphql/';

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
    //console.log(err);
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
      dispatch({
        type: STILL_LOGGEDIN,
      });
    } else {
      dispatch({
        type: LOGOUT,
      });
    }
  } catch (err) {
    //console.log(err);
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
    console.log(err);
  }
};

export const login = loginInput => async dispatch => {
  const {username, password} = loginInput;
  const query = `
  mutation {
    loginUser(input: {email: "${username}", passwordfield: "${password}"}){
      token
      user{
        id
        email
        firstName
        lastName
      }
    }
  }
  `;
  // don't forget to use dispatch here!
  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       // these could be different for your API call
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({query}),
  //   });
  //   const resp = await response.json();
  //   //console.log(resp.data.loginUser.token);
  //   //return;
  //   if (resp.data.loginUser !== null) {
  //     const o = {
  //       token: resp.data.loginUser.token,
  //       userId: resp.data.loginUser.user.id,
  //     };
  //     setLoginLocal(o); // storing in local storage for next launch
  //     dispatch(setLoginState(o)); // our action is called here
  //     // response success checking logic could differ
  //   } else {
  //     //console.log(resp.errors[0].message);
  //     Alert.alert('Login Failed', 'Username or Password is incorrect');
  //   }
  // }
  try {
    const loginUser = await axios({
      url,
      method: 'post',
      data: {
        query,
      },
    });
    if (loginUser.data.data.loginUser !== null) {
      const o = {
        token: loginUser.data.data.loginUser.token,
        userId: loginUser.data.data.loginUser.user.id,
        isLoggedIn: true,
      };
      //console.log(o);
      setLoginLocal(o); // storing in local storage for next launch
      dispatch(setLoginState(o)); // our action is called here
      // response success checking logic could differ
    } else {
      Alert.alert('Login Failed', 'Username or Password is incorrect');
      return 'failed';
    }
  } catch (err) {
    //Alert.alert('Login Failed', 'Some error occured, please retry');
    Alert.alert(
      'Error',
      'Some error occured, please check your internet connection and retry',
    );
    return 'failed';
  }
};

// Logout
//export const logout = () => ({type: LOGOUT});
export const logout = () => {
  removeUserData();
  return {
    type: LOGOUT,
  };
};
