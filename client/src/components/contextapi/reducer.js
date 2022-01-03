import { isEqual } from '../utils/helperFunctions';

export const initialState = {
  user: null,
  mydevices: null,
  playlist: null,
  currentPlaylist: null,
  lyrics: null,
  vcLang: 'en-IN',
  albumBackground: false,
  trackAnalysis: null,
  nextTracks: null,
  previousTracks: null,
  playing: false,
  position: 0,
  shuffle: false,
  repeatMode: 0,
  isMuted: false,
  current: null,
  token: window.localStorage.getItem('token'),
  minplayertype: 1,
  maxplayertype: 0,
  theme: 0,
  newReleases: null,
  newReleasesTile: 0,
  mytoptracks: null,
  deviceId: null,
  followedArtists: null,
  featuredPlaylists: null,
  myTopArtists: null,
  recommendations: null,
  categories: null,
  bollywoodHits: null,
  bollywoodNew: null,
  playerReady: false,
  notibar: {
    errorMsg: null,
    errorType: false,
  },
  history: {
    library: ['/library'],
    search: ['/search'],
  },
  settings: {
    isAddToPlaylistOpen: false,
    trackToAdd: null,
    isKeyboard: false,
    isQueue: false,
    isDevices: false,
  },
};

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_MY_DEVICES':
      return {
        ...state,
        mydevices: action.mydevices,
      };
    case 'SET_TOKEN':
      //console.log('reducer', action.token);
      return {
        ...state,
        token: action.token,
      };
    case 'SAVE_ROUTE':
      //console.log('reducer', action.token);
      const route = action.payload;
      const relativeRoute = action.relativeRoute;

      if (route === `/${relativeRoute}`) {
        return {
          ...state,
          history: {
            ...state.history,
            [relativeRoute]: [route],
          },
        };
      }

      const rootRoute = `/${relativeRoute}`;
      const currentHistory = state.history[relativeRoute] || [];
      const updatedHistory =
        route === rootRoute ? [route] : [route, ...currentHistory];

      return {
        ...state,
        history: {
          ...state.history,
          [relativeRoute]: updatedHistory,
        },
      };

    case 'PLAYER_READY':
      return {
        ...state,
        playerReady: action.playerReady,
      };
    case 'SET_NOTIBAR':
      return {
        ...state,
        notibar: {
          ...state.notibar,
          errorMsg: action.errorMsg,
          errorType: action.errorType,
        },
      };

    case 'SET_MIN_TYPE':
      return {
        ...state,
        minplayertype: action.minplayertype,
      };
    case 'SET_MAX_TYPE':
      return {
        ...state,
        maxplayertype: action.maxplayertype,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.theme,
      };
    case 'SET_PLAYLIST':
      return {
        ...state,
        playlist: action.playlist,
      };

    case 'SET_MUTED':
      return {
        ...state,
        isMuted: action.isMuted,
      };
    case 'SET_CURRENT_PLAYLIST':
      return {
        ...state,
        currentPlaylist: action.list,
      };
    case 'SET_LYRICS':
      return {
        ...state,
        lyrics: action.lyrics,
      };
    case 'SET_VC_LANG':
      return {
        ...state,
        vcLang: action.lang,
      };
    case 'SET_ALBUM_BG':
      return {
        ...state,
        albumBackground: action.show,
      };
    case 'SET_TRACK_ANALYSIS':
      return {
        ...state,
        trackAnalysis: action.analysis,
      };
    case 'SET_TRACK_TO_ADD':
      return {
        ...state,
        settings: {
          ...state.settings,
          trackToAdd: action.trackToAdd,
        },
      };
    case 'TOGGLE_ADD_TO_PLAYLIST':
      return {
        ...state,
        settings: {
          ...state.settings,
          isAddToPlaylistOpen: action.show,
        },
      };
    case 'TOGGLE_KEYBOARD':
      return {
        ...state,
        settings: {
          ...state.settings,
          isKeyboard: action.show,
        },
      };
    case 'TOGGLE_QUEUE':
      return {
        ...state,
        settings: {
          ...state.settings,
          isQueue: action.show,
        },
      };
    case 'TOGGLE_MY_DEVICES':
      return {
        ...state,
        settings: {
          ...state.settings,
          isDevices: action.show,
        },
      };

    case 'NEW_RELEASES':
      return {
        ...state,
        newReleases: action.newReleases,
      };
    case 'NEW_RELEASES_TILE':
      return {
        ...state,
        newReleasesTile: action.index,
      };
    case 'MY_TOP_TRACKS':
      return {
        ...state,
        mytoptracks: action.mytoptracks,
      };

    case 'SET_POSITION':
      return {
        ...state,
        position: action.position,
      };
    case 'SET_CURRENT':
      console.log('called');

      if (!isEqual(state.current, action.current)) {
        console.log('changed');
        return {
          ...state,
          current: action.current,
        };
      }
    case 'SET_NEXT_TRACK':
      if (!isEqual(state.nextTracks, action.nextTracks)) {
        return {
          ...state,
          nextTracks: action.nextTracks,
        };
      }
    case 'SET_PREVIOUS_TRACKS':
      if (!isEqual(state.previousTracks, action.previousTracks)) {
        return {
          ...state,
          previousTracks: action.previousTracks,
        };
      }
    case 'SET_PLAYING':
      if (state.playing != action.playing) {
        return {
          ...state,
          playing: action.playing,
        };
      }
    case 'SET_SHUFFLE':
      if (state.shuffle != action.shuffle) {
        return {
          ...state,
          shuffle: action.shuffle,
        };
      }
    case 'SET_REPEAT':
      if (!state.repeatMode && action.repeatMode != state.repeatMode) {
        return {
          ...state,
          repeatMode: action.repeatMode,
        };
      }

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
