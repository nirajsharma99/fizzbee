import { combineReducers } from 'redux';
import libraryReducer from './reducers/libraryReducer';
import appReducer from './reducers/app-reducer';
import playerReducer from './reducers/playerReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  library: libraryReducer,
  app: appReducer,
  player: playerReducer,
  user: userReducer,
});

export default (state, action) => {
  return rootReducer(state, action);
};
