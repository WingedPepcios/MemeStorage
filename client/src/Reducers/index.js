import { combineReducers } from 'redux';
import userReducer from './userReducer';
import memeReducer from './memeReducer';
import modalReducer from './modalReducer';

const reducers = combineReducers({
  user: userReducer,
  memes: memeReducer,
  modals: modalReducer,
});

export default reducers;
