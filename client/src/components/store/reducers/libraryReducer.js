import {
  SET_CURRENT_PLAYLIST,
  SET_PLAYLIST,
  NEW_RELEASES,
  MY_TOP_TRACKS,
  SET_FEATURED_PLAYLIST,
  SET_BOLLYWOOD_HITS,
  SET_BOLLYWOOD_NEW,
  SET_CATEGORIES,
  SET_MY_TOP_ARTISTS,
  SET_MY_ARTISTS_RECOMMENDATIONS,
  SET_ARTISTS,
  NEW_RELEASES_TILE,
} from '../actions/types';

const initialState = {
  playlist: null,
  currentPlaylist: null,
  newReleases: null,
  newReleasesTile: 0,
  mytoptracks: null,
  featuredPlaylists: null,
  myTopArtists: null,
  categories: null,
  bollywoodHits: null,
  bollywoodNew: null,
  recommendations: null,
  followedArtists: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist,
      };
    case SET_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.list,
      };
    case NEW_RELEASES:
      return {
        ...state,
        newReleases: action.newReleases,
      };
    case NEW_RELEASES_TILE:
      return {
        ...state,
        newReleasesTile: action.index,
      };
    case MY_TOP_TRACKS:
      return {
        ...state,
        mytoptracks: action.mytoptracks,
      };
    case SET_FEATURED_PLAYLIST:
      return {
        ...state,
        featuredPlaylists: action.featuredPlaylists,
      };
    case SET_BOLLYWOOD_HITS:
      return {
        ...state,
        bollywoodHits: action.bollywoodHits,
      };
    case SET_BOLLYWOOD_NEW:
      return {
        ...state,
        bollywoodNew: action.bollywoodNew,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_MY_TOP_ARTISTS:
      return {
        ...state,
        myTopArtists: action.myTopArtists,
      };

    case SET_MY_ARTISTS_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: action.recommendations,
      };
    case SET_ARTISTS:
      return {
        ...state,
        followedArtists: action.followedArtists,
      };
    default: {
      return state;
    }
  }
}
