export const initialState = {
  user: null,
  playlist: [],
  playing: false,
  item: null,
  token: null,
  newReleases: localStorage.getItem('token') || null,
  mytoptracks: null,
  deviceId: null,
  followedArtists: null,
  featuredPlaylists: null,
  myTopArtists: null,
  recommendations: null,
  categories: null,
  bollywoodHits: null,
  bollywoodNew: null,
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
      //console.log('reducer', action.token);
      return {
        ...state,
        token: action.token,
      };
    case 'SET_PLAYLIST':
      return {
        ...state,
        playlist: action.playlist,
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
    case 'SET_ARTISTS':
      return {
        ...state,
        followedArtists: action.followedArtists,
      };
    case 'SET_MY_TOP_ARTISTS':
      return {
        ...state,
        myTopArtists: action.myTopArtists,
      };
    case 'SET_FEATURED_PLAYLIST':
      return {
        ...state,
        featuredPlaylists: action.featuredPlaylists,
      };
    case 'SET_MY_ARTISTS_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: action.recommendations,
      };
    case 'SET_BOLLYWOOD_HITS':
      return {
        ...state,
        bollywoodHits: action.bollywoodHits,
      };
    case 'SET_BOLLYWOOD_NEW':
      return {
        ...state,
        bollywoodNew: action.bollywoodNew,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
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
