import { combineReducers } from 'redux';
import userReducer from './userReducer';
import memeReducer from './memeReducer';
import modalReducer from './modalReducer';
import paginReducer from './paginReducer';
import filterReducer from './filterReducer';

const reducers = combineReducers({
  user: userReducer,
  memes: memeReducer,
  modals: modalReducer,
  pagination: paginReducer,
  filters: filterReducer,
});

export default reducers;
