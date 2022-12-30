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
  SET_HEADER_INVERT,
  SET_HEADER_COLLAPSE,
  SET_HEADER_HIDE,
  SET_APP_BACKGROUND,
  SET_APP_BACKGROUND_BLUR,
} from '../types';

export const setNotibar = (msg, type, delay) => (dispatch) => {
  dispatch({
    type: SET_NOTIBAR,
    msg: msg,
    msgType: type,
    delay: delay,
  });
};

export const setAppBackground = (bg) => (dispatch) => {
  dispatch({
    type: SET_APP_BACKGROUND,
    appBackground: bg
  });
  if (!bg) {
    document.body.style.background = `black`;
  } else {
    document.body.style.background = `url(${bg}) no-repeat center`;
    document.body.style.backgroundSize = 'cover';
  }
  window.localStorage.setItem('appBackground', JSON.stringify(bg));
}

export const setAppBackgroundBlur = (blur) => (dispatch) => {
  dispatch({
    type: SET_APP_BACKGROUND_BLUR,
    appBackgroundBlur: blur
  });
  document.documentElement.style.setProperty(
    '--app-background-blur',
    `${blur}px`
  );
  window.localStorage.setItem('appBackgroundBlur', JSON.stringify(blur));
}


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

export const setHeaderInvert = (decision) => (dispatch) => {
  dispatch({
    type: SET_HEADER_INVERT,
    headerInvert: decision,
  });
  window.localStorage.setItem('headerInvert', decision);
};


export const setHeaderHide = (decision) => (dispatch) => {
  dispatch({
    type: SET_HEADER_HIDE,
    headerHide: decision,
  });
  window.localStorage.setItem('headerHide', decision);
};

export const setHeaderCollapse = (decision) => (dispatch) => {
  dispatch({
    type: SET_HEADER_COLLAPSE,
    headerCollapse: decision,
  });
  window.localStorage.setItem('headerCollapse', decision);
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
  dispatch(setNotibar('Switched Handedness!', true, 7000));
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