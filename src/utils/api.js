import axios from 'axios';
import Config from 'react-native-config';
import store from '../store';
import {LOGOUT} from '../actions/types';

const baseURL = Config.API_URL;
//const baseURL = 'http://127.0.0.1:4000/api/graphql';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);

export default api;
