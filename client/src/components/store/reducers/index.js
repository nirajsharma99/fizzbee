import { combineReducers } from 'redux';
import libraryReducer from './libraryReducer';
import appReducer from './app-reducer';
import playerReducer from './playerReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  library: libraryReducer,
  app: appReducer,
  player: playerReducer,
  user: userReducer,
});

export default (state, action) => {
  return rootReducer(state, action);
};
