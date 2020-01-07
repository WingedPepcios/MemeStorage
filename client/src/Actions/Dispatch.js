import { SET_USER_DATA, SET_MEMES_ARRAY, DELETE_USER_DATA } from '../Types/Reducers';
import { getCurrentUserData, getMemes, logoutUserFunction } from './index';

export const dispatchUserData = () => async function dispatchUserDataPromise(dispatch) {
  const response = await getCurrentUserData();
  if (response) {
    dispatch({
      type: SET_USER_DATA,
      payload: response,
    });
  }
};

export const logoutUser = () => async function logaoutUserPromise(dispatch) {
  const response = await logoutUserFunction();
  if (response) {
    dispatch({
      type: DELETE_USER_DATA,
    });

    // Getting memes again, without user settings
    const memes = await getMemes();
    if (memes) {
      dispatch({
        type: SET_MEMES_ARRAY,
        payload: memes,
      });
    }
  }
};

export const dispatchMemes = () => async function dispatchMemesPromise(dispatch) {
  const response = await getMemes();
  if (response) {
    dispatch({
      type: SET_MEMES_ARRAY,
      payload: response,
    });
  }
};
