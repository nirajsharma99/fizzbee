import {
  SET_NOTIBAR,
  SET_NOTIBAR_TYPE,
  SET_NOTIBAR_POS,
  SET_ALBUM_BG,
  SET_DARKMODE,
  SET_TRACK_TO_ADD,
  TOGGLE_ADD_TO_PLAYLIST,
  TOGGLE_KEYBOARD,
  TOGGLE_QUEUE,
  TOGGLE_MY_DEVICES,
  TOGGLE_COLOR_PALETTE,
  TOGGLE_HANDEDNESS,
  SET_HOME_SLIDER_TYPE,
  SET_HOME_SLIDER_AUTOPLAY,
  SET_HOME_SLIDER_DELAY,
  SET_HEADER_INVERT,
  SET_HEADER_COLLAPSE,
  SET_HEADER_HIDE
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
    delay: 7000,
  },
  notibarType: window.localStorage.getItem('notibarType')
    ? JSON.parse(window.localStorage.getItem('notibarType'))
    : 0,
  notibarPos: window.localStorage.getItem('notibarPos')
    ? JSON.parse(window.localStorage.getItem('notibarPos'))
    : 0,
  headerInvert: window.localStorage.getItem('headerInvert')
    ? JSON.parse(window.localStorage.getItem('headerInvert'))
    : false,
  headerHide: window.localStorage.getItem('headerHide')
    ? JSON.parse(window.localStorage.getItem('headerHide'))
    : false,
  headerCollapse: window.localStorage.getItem('headerCollapse')
    ? JSON.parse(window.localStorage.getItem('headerCollapse'))
    : true,
  settings: {
    isAddToPlaylistOpen: false,
    trackToAdd: null,
    isKeyboard: false,
    isQueue: false,
    isDevices: false,
  },
  homeSlider: {
    sliderType: window.localStorage.getItem('sliderType')
      ? JSON.parse(window.localStorage.getItem('sliderType'))
      : 0,
    autoPlay: window.localStorage.getItem('autoPlay')
      ? JSON.parse(window.localStorage.getItem('autoPlay'))
      : true,
    autoPlayDelay: window.localStorage.getItem('autoPlayDelay')
      ? JSON.parse(window.localStorage.getItem('autoPlayDelay'))
      : 2.5,
  }
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
          delay: action.delay,
        },
      };
    case SET_NOTIBAR_TYPE:
      return {
        ...state,
        notibarType: action.notibarType,
      };
    case SET_NOTIBAR_POS:
      return {
        ...state,
        notibarPos: action.notibarPos,
      };
    case SET_HEADER_INVERT:
      return {
        ...state,
        headerInvert: action.headerInvert,
      };
    case SET_HEADER_HIDE:
      return {
        ...state,
        headerHide: action.headerHide,
      };
    case SET_HEADER_COLLAPSE:
      return {
        ...state,
        headerCollapse: action.headerCollapse,
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
    case SET_HOME_SLIDER_TYPE:
      return {
        ...state,
        homeSlider: {
          ...state.homeSlider,
          sliderType: action.sliderType,
        },
      };
    case SET_HOME_SLIDER_AUTOPLAY:
      return {
        ...state,
        homeSlider: {
          ...state.homeSlider,
          autoPlay: action.autoPlay,
        },
      };
    case SET_HOME_SLIDER_DELAY:
      return {
        ...state,
        homeSlider: {
          ...state.homeSlider,
          autoPlayDelay: action.autoPlayDelay
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
