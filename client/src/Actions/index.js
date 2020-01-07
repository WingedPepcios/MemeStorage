import http from '../Utils/Instance';
import {
  USER_CURRENT,
  USER_DEFAULT,
  USER_LOGOUT,
  USER_REGISTER,
} from '../Types/UserApi';
import { MEME_DEFAULT } from '../Types/MemesApi';

// GET
export const getCurrentUserData = async () => {
  const response = await http.get(USER_CURRENT);
  const { status, user } = response.data;
  if (status) {
    return user;
  }
  return null;
};

export const getMemes = async () => {
  const response = await http.get(MEME_DEFAULT);
  const { status, memes } = response.data;
  if (status) {
    return memes;
  }
  return null;
};

export const logoutUserFunction = async () => {
  const response = await http.get(USER_LOGOUT);
  const { status, message } = response.data;
  if (status) {
    return message;
  }
  return null;
};

// POST
export const postLoginUser = async ({ username, password }) => {
  const response = await http.post(USER_DEFAULT, { username, password });
  const { status, user, message } = response.data;
  if (status) {
    return user;
  }
  return { error: message };
};

export const postRegisterUser = async ({ username, password, repeatPassword }) => {
  const response = await http.post(USER_REGISTER, { username, password, repeatPassword });
  const { status, user, message } = response.data;
  if (status) {
    return user;
  }
  return { error: message };
};

export const postMeme = async (data) => {
  const response = await http.post(MEME_DEFAULT, data);
  const { status, meme } = response.data;
  if (status) {
    return meme;
  }
  return null;
};