import { combineReducers } from 'redux';
import userReducer from './userReducer';
import memeReducer from './memeReducer';
import modalReducer from './modalReducer';
import paginReducer from './paginReducer';
import filterReducer from './filterReducer';
import userMemesReducer from './userMemesReducer';

const reducers = combineReducers({
  user: userReducer,
  memes: memeReducer,
  modals: modalReducer,
  pagination: paginReducer,
  filters: filterReducer,
  userMemes: userMemesReducer,
});

export default reducers;
