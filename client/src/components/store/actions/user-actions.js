import { SET_MY_DEVICES, SET_USER } from '../actions/types';

export const setUser = (data) => (dispatch) => {
  dispatch({ type: SET_USER, user: data });
};
