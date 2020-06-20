import {
  SET_USER_DATA,
  SET_MEMES_ARRAY,
  DELETE_USER_DATA,
  SET_MEMES_PAGIN,
  SET_MEMES_FILTERS,
  SET_USER_MEMES,
  CLEAR_MEMES_ARRAY,
  CLEAR_MEMES_PAGIN,
} from '../Types/Reducers';
import { getCurrentUserData, getMemes, logoutUserFunction } from './index';

export const dispatchUserData = () => async function dispatchUserDataPromise(dispatch) {
  const response = await getCurrentUserData();
  if (response) {
    dispatch({
      type: SET_USER_DATA,
      payload: { isChecked: true, ...response },
    });
  } else {
    dispatch({
      type: SET_USER_DATA,
      payload: { isChecked: true },
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
    const responseMemes = await getMemes({}, null);
    if (responseMemes) {
      const { memes, pagination, filters } = responseMemes;
      dispatch({
        type: SET_MEMES_ARRAY,
        payload: memes,
      });
      dispatch({
        type: SET_MEMES_PAGIN,
        payload: pagination,
      });
      dispatch({
        type: SET_MEMES_FILTERS,
        payload: filters,
      });
    }
  }
};

export const dispatchMemes = (query, user) => async function dispatchMemesPromise(dispatch) {
  const response = await getMemes(query, user);
  if (response) {
    const { memes, pagination, filters } = response;
    if (user) {
      dispatch({
        type: SET_USER_MEMES,
        payload: memes,
      });
    } else {
      dispatch({
        type: SET_MEMES_ARRAY,
        payload: memes,
      });
    }
    dispatch({
      type: SET_MEMES_PAGIN,
      payload: pagination,
    });
    dispatch({
      type: SET_MEMES_FILTERS,
      payload: filters,
    });
  } else {
    if (user) {
      dispatch({
        type: CLEAR_MEMES_ARRAY,
        payload: null,
      });
    } else {
      dispatch({
        type: CLEAR_MEMES_ARRAY,
        payload: null,
      });
    }
    dispatch({
      type: CLEAR_MEMES_PAGIN,
      payload: null,
    });
  }
};
