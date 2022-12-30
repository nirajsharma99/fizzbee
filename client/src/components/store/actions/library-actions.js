import { SET_PLAYLIST, SET_CURRENT_PLAYLIST } from '../types';

export const setPlaylist = (uris) => (dispatch) => {
  dispatch({
    type: SET_PLAYLIST,
    playlist: uris,
  });
};

export const setCurrentPlaylist = (list) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PLAYLIST,
    list: list,
  });
};
