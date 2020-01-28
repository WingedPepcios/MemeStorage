import { combineReducers } from 'redux';
import userReducer from './userReducer';
import memeReducer from './memeReducer';
import modalReducer from './modalReducer';
import paginReducer from './paginReducer';

const reducers = combineReducers({
  user: userReducer,
  memes: memeReducer,
  modals: modalReducer,
  pagination: paginReducer,
});

export default reducers;
