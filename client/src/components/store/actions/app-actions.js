import {
  SET_NOTIBAR,
  SET_ALBUM_BG,
  SET_TRACK_TO_ADD,
  TOGGLE_ADD_TO_PLAYLIST,
  TOGGLE_KEYBOARD,
  TOGGLE_QUEUE,
  TOGGLE_MY_DEVICES,
  SET_DARKMODE,
} from '../actions/types';

export const setNotibar = (msg, type) => (dispatch) => {
  dispatch({
    type: SET_NOTIBAR,
    msg: msg,
    msgType: type,
  });
};

export const setTrackToAdd = (track) => (dispatch) => {
  dispatch({
    type: SET_TRACK_TO_ADD,
    trackToAdd: track,
  });
};

export const toggleAddToPlaylist = (decision) => (dispatch) => {
  dispatch({
    type: TOGGLE_ADD_TO_PLAYLIST,
    show: decision,
  });
};

export const toggleKeyboard = (decision) => (dispatch) => {
  dispatch({ type: TOGGLE_KEYBOARD, show: decision });
};

export const toggleMyDevices = (decision) => (dispatch) => {
  dispatch({ type: TOGGLE_MY_DEVICES, show: decision });
};

export const toggleQueue = (decision) => (dispatch) => {
  dispatch({ type: TOGGLE_QUEUE, show: decision });
};

export const setAlbumBG = (decision) => (dispatch) => {
  dispatch({ type: SET_ALBUM_BG, show: decision });
};

export const toggleDarkMode = () => (dispatch, getState) => {
  const darkMode = getState().app.darkMode;
  let themed = darkMode === 'dark' ? 'light' : 'dark';
  dispatch({ type: SET_DARKMODE, darkMode: themed });
  window.localStorage.setItem('theme', themed);
};
