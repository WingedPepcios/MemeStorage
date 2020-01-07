import { combineReducers } from 'redux';
import userReducer from './userReducer';
import memeReducer from './memeReducer';

const reducers = combineReducers({
  user: userReducer,
  memes: memeReducer,
});

export default reducers;
