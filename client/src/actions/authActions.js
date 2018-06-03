import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => {
      console.log(res)
      history.push('/login')
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    })
};

// Login User
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;

      // Set token to localStorage
      localStorage.setItem('jwtToken', token);

      // Set token to header for corres. requests
      setAuthToken(token);

      // Decode token for user data
      const decoded = jwtDecode(token);

      // Set user
      dispatch({
        type: SET_USER,
        payload: decoded
      });
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    })
};

export const setUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  };
}

// Logout User
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');

  // Remove header
  setAuthToken(false);

  // Reset user
  dispatch({
    type: 'SET_USER',
    payload: {}
  });
}