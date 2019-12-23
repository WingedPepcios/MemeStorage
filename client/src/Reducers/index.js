import { combineReducers } from 'redux';
import userReducer from './userReducer';

const reducers = combineReducers({
  userData: userReducer,
});

export default reducers;
