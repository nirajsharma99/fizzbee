export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
  newReleases: localStorage.getItem('token') || null,
  mytoptracks: null,
  deviceId: null,
};

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };
    case 'NEW_RELEASES':
      return {
        ...state,
        newReleases: action.newReleases,
      };
    case 'MY_TOP_TRACKS':
      return {
        ...state,
        mytoptracks: action.mytoptracks,
      };

    case 'SET_PLAYING':
      return {
        ...state,
        playing: action.playing,
      };
    case 'SET_ITEM':
      return {
        ...state,
        item: action.item,
      };
    case 'SET_DEVICE_ID':
      return {
        ...state,
        deviceId: action.deviceId,
      };
    default:
      return state;
  }
};
export default reducer;
