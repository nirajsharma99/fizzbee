import {
  SET_NOTIBAR,
  SET_NOTIBAR_TYPE,
  SET_NOTIBAR_POS,
  SET_ALBUM_BG,
  SET_TRACK_TO_ADD,
  TOGGLE_ADD_TO_PLAYLIST,
  TOGGLE_KEYBOARD,
  TOGGLE_QUEUE,
  TOGGLE_MY_DEVICES,
  SET_DARKMODE,
  TOGGLE_COLOR_PALETTE,
  TOGGLE_HANDEDNESS,
  SET_HOME_SLIDER_TYPE,
  SET_HOME_SLIDER_AUTOPLAY,
  SET_HOME_SLIDER_DELAY,
} from '../actions/types';

export const setNotibar = (msg, type, delay) => (dispatch) => {
  dispatch({
    type: SET_NOTIBAR,
    msg: msg,
    msgType: type,
    delay: delay,
  });
};

export const setNotibarType = (type) => (dispatch) => {
  dispatch({
    type: SET_NOTIBAR_TYPE,
    notibarType: type,
  });
  window.localStorage.setItem('notibarType', type);

};
export const setNotibarPos = (pos) => (dispatch) => {
  dispatch({
    type: SET_NOTIBAR_POS,
    notibarPos: pos,
  });
  window.localStorage.setItem('notibarPos', pos);
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
  dispatch({ type: SET_DARKMODE, darkMode: !darkMode });
  window.localStorage.setItem('darkMode', !darkMode);
};

export const toggleColorPalette = (decision) => (dispatch) => {
  dispatch({ type: TOGGLE_COLOR_PALETTE, colorpalette: decision });
};

export const toggleHandedness = (handedness) => (dispatch) => {
  dispatch({ type: TOGGLE_HANDEDNESS, handedness: handedness });
  window.localStorage.setItem('handedness', handedness);
  dispatch(setNotibar('Switched Handedness!', true));
}

export const setHomeSliderType = (data) => (dispatch) => {
  dispatch({ type: SET_HOME_SLIDER_TYPE, sliderType: data });
  window.localStorage.setItem('sliderType', data);
}
export const setHomeSliderAutoplay = (data) => (dispatch) => {
  dispatch({ type: SET_HOME_SLIDER_AUTOPLAY, autoPlay: data });
  window.localStorage.setItem('autoPlay', data);
}
export const setHomeSliderDelay = (data) => (dispatch) => {
  dispatch({ type: SET_HOME_SLIDER_DELAY, autoPlayDelay: data });
  window.localStorage.setItem('autoPlayDelay', data);
}