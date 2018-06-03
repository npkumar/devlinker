import _ from 'lodash';
import { SET_USER } from '../actions/types';

const initState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
}