import {
  SET_TOKEN,
  SET_PLAYING,
  SET_SHUFFLE,
  SET_REPEAT,
  SET_DEVICE_ID,
  SET_POSITION,
  SET_CURRENT,
  SET_MUTED,
  SET_VC_LANG,
  SET_MIN_TYPE,
  SET_MAX_TYPE,
  SET_SIDEBAR_TYPE,
  SET_PLAYER_READY,
  SET_THEME,
  SET_LYRICS,
  SET_FONT,
  SET_CURRENT_TILE_ID,
  SET_EXPIRES_IN,
  SET_PREMIUM,
  SET_ISLANDDOUBLE_TYPE,
  SET_ISLAND_POS,
  SET_ISLAND_SWIPE_LEFT,
  SET_ISLAND_SWIPE_RIGHT,
  SET_ISLAND_LONG_PRESS,
  SET_PARTY_MODE,
  SET_PARTY_ID
} from '../types';
export const initialState = {
  token: window.localStorage.getItem('token'),
  expiresIn: null,
  playing: false,
  isPremium: true,
  position_ms: 0,
  isShuffle: false,
  repeatMode: 0,
  theme: JSON.parse(window.localStorage.getItem('theme'))
    ? JSON.parse(window.localStorage.getItem('theme'))
    : '#00FF7F',
  font: window.localStorage.getItem('font')
    ? window.localStorage.getItem('font')
    : "'Shadows Into Light', cursive",
  lyrics: null,
  deviceId: null,
  playerReady: false,
  isMuted: false,
  vcLang: 'en-IN',
  current: null,
  currentTileId: null,
  minplayertype: window.localStorage.getItem('min')
    ? JSON.parse(window.localStorage.getItem('min'))
    : 1,
  maxplayertype: window.localStorage.getItem('max')
    ? JSON.parse(window.localStorage.getItem('max'))
    : 0,
  sideBartype: window.localStorage.getItem('sideBar')
    ? JSON.parse(window.localStorage.getItem('sideBar'))
    : 1,
  islandDouble: window.localStorage.getItem('islandDouble')
    ? JSON.parse(window.localStorage.getItem('islandDouble'))
    : 0,
  islandPos: window.localStorage.getItem('islandPos')
    ? JSON.parse(window.localStorage.getItem('islandPos'))
    : 0,
  islandSwipeLeft: window.localStorage.getItem('islandSwipeLeft')
    ? JSON.parse(window.localStorage.getItem('islandSwipeLeft'))
    : 1,
  islandSwipeRight: window.localStorage.getItem('islandSwipeRight')
    ? JSON.parse(window.localStorage.getItem('islandSwipeRight'))
    : 2,
  islandLongPress: window.localStorage.getItem('islandLongPress')
    ? JSON.parse(window.localStorage.getItem('islandLongPress'))
    : 0,
  partyMode: window.localStorage.getItem('partyMode')
    ? JSON.parse(window.localStorage.getItem('partyMode'))
    : false,
  partyId: window.localStorage.getItem('partyId')
    ? JSON.parse(window.localStorage.getItem('partyId'))
    : null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_EXPIRES_IN:
      return {
        ...state,
        expiresIn: action.expiresIn,
      };
    case SET_PLAYING: {
      return {
        ...state,
        playing: action.playing,
      };
    }
    case SET_SHUFFLE: {
      return {
        ...state,
        isShuffle: action.shuffle,
      };
    }
    case SET_REPEAT: {
      return {
        ...state,
        repeatMode: action.repeatMode,
      };
    }
    case SET_DEVICE_ID: {
      return {
        ...state,
        deviceId: action.deviceId,
      };
    }
    case SET_POSITION:
      return {
        ...state,
        position_ms: action.position,
      };
    case SET_CURRENT: {
      return {
        ...state,
        current: action.current,
      };
    }
    case SET_CURRENT_TILE_ID: {
      return {
        ...state,
        currentTileId: action.id,
      };
    }
    case SET_MUTED: {
      return {
        ...state,
        isMuted: action.isMuted,
      };
    }
    case SET_VC_LANG: {
      return {
        ...state,
        vcLang: action.lang,
      };
    }
    case SET_MIN_TYPE:
      return {
        ...state,
        minplayertype: action.minplayertype,
      };
    case SET_MAX_TYPE:
      return {
        ...state,
        maxplayertype: action.maxplayertype,
      };
    case SET_ISLANDDOUBLE_TYPE:
      return {
        ...state,
        islandDouble: action.islandDouble,
      };
    case SET_ISLAND_POS:
      return {
        ...state,
        islandPos: action.islandPos,
      };
    case SET_ISLAND_SWIPE_LEFT:
      return {
        ...state,
        islandSwipeLeft: action.islandSwipeLeft,
      };
    case SET_ISLAND_SWIPE_RIGHT:
      return {
        ...state,
        islandSwipeRight: action.islandSwipeRight,
      };
    case SET_ISLAND_LONG_PRESS:
      return {
        ...state,
        islandLongPress: action.islandLongPress,
      };
    case SET_PARTY_MODE:
      return {
        ...state,
        partyMode: action.partyMode,
      };
    case SET_PARTY_ID:
      return {
        ...state,
        partyId: action.partyId,
      };
    case SET_SIDEBAR_TYPE:
      return {
        ...state,
        sideBartype: action.sideBartype,
      };
    case SET_PLAYER_READY:
      return {
        ...state,
        playerReady: action.playerReady,
      };
    case SET_PREMIUM:
      return {
        ...state,
        isPremium: action.isPremium,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case SET_LYRICS:
      return {
        ...state,
        lyrics: action.lyrics,
      };
    case SET_FONT:
      return {
        ...state,
        font: action.font,
      };

    default: {
      return state;
    }
  }
}
