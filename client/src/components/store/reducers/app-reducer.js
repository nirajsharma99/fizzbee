import {
  SET_NOTIBAR,
  SET_ALBUM_BG,
  SET_DARKMODE,
  SET_TRACK_TO_ADD,
  TOGGLE_ADD_TO_PLAYLIST,
  TOGGLE_KEYBOARD,
  TOGGLE_QUEUE,
  TOGGLE_MY_DEVICES,
  TOGGLE_COLOR_PALETTE,
  TOGGLE_HANDEDNESS
} from '../actions/types';

const initialState = {
  albumBackground: false,
  darkMode: window.localStorage.getItem('darkMode')
    ? JSON.parse(window.localStorage.getItem('darkMode'))
    : true,
  colorpalette: true,
  handedness: window.localStorage.getItem('handedness')
    ? JSON.parse(window.localStorage.getItem('handedness'))
    : true,
  notibar: {
    msg: null,
    type: false,
  },
  settings: {
    isAddToPlaylistOpen: false,
    trackToAdd: null,
    isKeyboard: false,
    isQueue: false,
    isDevices: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DARKMODE:
      return {
        ...state,
        darkMode: action.darkMode,
      };
    case TOGGLE_COLOR_PALETTE:
      return {
        ...state,
        colorpalette: action.colorpalette,
      };
    case SET_NOTIBAR:
      return {
        ...state,
        notibar: {
          ...state.notibar,
          msg: action.msg,
          type: action.msgType,
        },
      };

    case SET_ALBUM_BG:
      return {
        ...state,
        albumBackground: action.show,
      };

    case SET_TRACK_TO_ADD:
      return {
        ...state,
        settings: {
          ...state.settings,
          trackToAdd: action.trackToAdd,
        },
      };

    case TOGGLE_ADD_TO_PLAYLIST:
      return {
        ...state,
        settings: {
          ...state.settings,
          isAddToPlaylistOpen: action.show,
        },
      };

    case TOGGLE_KEYBOARD:
      return {
        ...state,
        settings: {
          ...state.settings,
          isKeyboard: action.show,
        },
      };

    case TOGGLE_QUEUE:
      return {
        ...state,
        settings: {
          ...state.settings,
          isQueue: action.show,
        },
      };

    case TOGGLE_MY_DEVICES:
      return {
        ...state,
        settings: {
          ...state.settings,
          isDevices: action.show,
        },
      };

    case TOGGLE_HANDEDNESS:
      return {
        ...state,
        handedness: action.handedness,
      };

    default:
      return state;
  }
}
