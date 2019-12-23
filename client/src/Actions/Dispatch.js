import { SET_USER_DATA } from '../Types/Reducers';
import { getCurrentUserData } from './index';

export const addUserData = () => {
  return async function(dispatch) {
    dispatch({
      type: SET_USER_DATA,
      payload: await getCurrentUserData(),
    });
  }
}