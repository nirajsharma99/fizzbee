import axios from 'axios';
import {
  SET_PLAYING,
  SET_SHUFFLE,
  SET_REPEAT,
  SET_DEVICE_ID,
  SET_POSITION,
  SET_CURRENT,
  SET_VC_LANG,
  SET_MIN_TYPE,
  SET_MAX_TYPE,
  SET_PLAYER_READY,
  SET_THEME,
  SET_LYRICS,
  SET_FONT,
  SET_CURRENT_TILE_ID,
  SET_EXPIRES_IN,
  SET_PREMIUM,
  SET_SIDEBAR_TYPE,
  SET_ISLANDDOUBLE_TYPE,
  SET_ISLAND_POS
} from '../actions/types';

export const setPlaying = (decision) => (dispatch) => {
  dispatch({
    type: SET_PLAYING,
    playing: decision,
  });
};

export const handleStateChange = (state) => (dispatch, getState) => {
  const { current, repeatMode, playing, isShuffle, position_ms } =
    getState().player;
  const { current_track } = state?.track_window || {};
  const { paused, shuffle, repeat_mode, position } = state || {};
  if (current?.id != current_track?.id) {
    dispatch({
      type: SET_CURRENT,
      current: current_track,
    });
  }
  if (
    current?.id === current_track?.id &&
    current?.duration_ms != current_track?.duration_ms
  ) {
    dispatch({
      type: SET_CURRENT,
      current: current_track,
    });
  }

  if (playing !== !paused) {
    dispatch({
      type: SET_PLAYING,
      playing: !paused,
    });
  }
  if (isShuffle !== shuffle) {
    dispatch({
      type: SET_SHUFFLE,
      shuffle: shuffle,
    });
  }

  if (repeatMode !== repeat_mode) {
    dispatch({
      type: SET_REPEAT,
      repeatMode: repeat_mode,
    });
  }

  if (position_ms !== position) {
    dispatch({
      type: SET_POSITION,
      position: position,
    });
  }
};

export const setRepeat = (decision) => (dispatch) => {
  dispatch({
    type: SET_REPEAT,
    repeatMode: decision,
  });
};

export const setDevice = (device_id) => (dispatch) => {
  dispatch({
    type: SET_DEVICE_ID,
    deviceId: device_id,
  });
};

export const setPlayerReady = (ready) => (dispatch) => {
  dispatch({ type: SET_PLAYER_READY, playerReady: ready });
};
//set account status (if premium or not)
export const setIsPremium = (isPremium) => (dispatch) => {
  dispatch({ type: SET_PREMIUM, isPremium: isPremium });
};

export const setMinType = (type) => (dispatch) => {
  dispatch({ type: SET_MIN_TYPE, minplayertype: type });
  window.localStorage.setItem('min', type);
};

export const setMaxType = (type) => (dispatch) => {
  dispatch({ type: SET_MAX_TYPE, maxplayertype: type });
  window.localStorage.setItem('max', type);
};

export const setIslandPos = (pos) => (dispatch) => {
  dispatch({ type: SET_ISLAND_POS, islandPos: pos });
  window.localStorage.setItem('islandPos', pos);
};


export const setIslandDouble = (type) => (dispatch) => {
  dispatch({ type: SET_ISLANDDOUBLE_TYPE, islandDouble: type });
  window.localStorage.setItem('islandDouble', type);
};

export const setSideBarType = (sideBartype) => (dispatch) => {
  dispatch({ type: SET_SIDEBAR_TYPE, sideBartype: sideBartype });
  window.localStorage.setItem('sideBar', sideBartype);
};

export const setTheme = (theme) => (dispatch) => {
  dispatch({ type: SET_THEME, theme: theme });
  window.localStorage.setItem('theme', JSON.stringify(theme));
};

export const setVCLang = (lang) => (dispatch) => {
  dispatch({ type: SET_VC_LANG, lang: lang });
};

export const setLyrics = (lyric) => (dispatch) => {
  dispatch({ type: SET_LYRICS, lyrics: lyric });
};

export const setFont = (font) => (dispatch) => {
  dispatch({ type: SET_FONT, font: font });
  window.localStorage.setItem('font', font);
  document.documentElement.style.setProperty('--font', font);
};

export const setCurrentTileId = (id) => (dispatch) => {
  dispatch({ type: SET_CURRENT_TILE_ID, id: id });
};

export const setExpiresIn = (duration) => (dispatch) => {
  dispatch({ type: SET_EXPIRES_IN, expiresIn: duration });
};
