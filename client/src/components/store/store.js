import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '.';

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk));
}
