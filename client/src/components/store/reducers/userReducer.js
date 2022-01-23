import { SET_MY_DEVICES, SET_USER } from '../actions/types';

const initialState = {
  user: null,
  mydevices: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_MY_DEVICES:
      return {
        ...state,
        mydevices: action.mydevices,
      };

    default: {
      return state;
    }
  }
}
