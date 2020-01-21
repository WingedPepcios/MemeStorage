import http from '../Utils/Instance';
import {
  USER_CURRENT,
  USER_DEFAULT,
  USER_LOGOUT,
  USER_REGISTER,
} from '../Types/UserApi';
import {
  MEME_DEFAULT,
  MEME_VOTE,
  MEME_SINGLE,
} from '../Types/MemesApi';
import {
  LABEL_DEFAULT,
} from '../Types/LabelsApi';

// GET
export const getCurrentUserData = async () => {
  const response = await http.get(USER_CURRENT);
  const { status, user } = response.data;
  if (status) {
    return user;
  }
  return null;
};

export const getUserMemes = async (user) => {
  const response = await http.get(`${MEME_DEFAULT}/${user}`);
  const { status, memes } = response.data;
  if (status) {
    return memes;
  }
  return null;
};

export const getMemes = async (page) => {
  const response = await http.get(MEME_DEFAULT, { page: page || 1 });
  const { status, memes, pagination } = response.data;
  if (status) {
    return { memes, pagination };
  }
  return null;
};

export const getMeme = async (id) => {
  const response = await http.get(`${MEME_SINGLE}/${id}`);
  const { status, meme } = response.data;
  if (status) {
    return meme;
  }
  return null;
};

export const getMemeReactions = async (id) => {
  const response = await http.get(`${MEME_VOTE}/${id}`);
  const { status, users } = response.data;
  if (status) {
    return users;
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

export const getLabels = async (name) => {
  const response = await http.get(`${LABEL_DEFAULT}/${name}`);
  const { status, labels } = response.data;
  if (status) {
    return labels;
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

export const postRegisterUser = async ({ username, password, passwordRepeat }) => {
  const response = await http.post(USER_REGISTER, { username, password, passwordRepeat });
  const { status, user, message } = response.data;
  if (status) {
    return user;
  }
  return { error: message };
};

export const postUpdateUser = async ({ password, passwordRepeat, username }) => {
  const response = await http.post(`${USER_DEFAULT}/${username}`, { password, passwordRepeat });
  const { status, message } = response.data;
  if (status) {
    return message;
  }
  return null;
};

export const postMeme = async (data) => {
  const response = await http.post(MEME_DEFAULT, data);
  const { status, meme } = response.data;
  if (status) {
    return meme;
  }
  return null;
};

export const postMemeUpdate = async (id, data) => {
  const response = await http.post(`${MEME_DEFAULT}/${id}`, data);
  const { status, meme } = response.data;
  if (status) {
    return meme;
  }
  return null;
};

export const postMemeReaction = async (id, data) => {
  const response = await http.post(`${MEME_VOTE}/${id}`, data);
  const { status, meme } = response.data;
  if (status) {
    return meme;
  }
  return null;
};

export const postLabels = async (name) => {
  const response = await http.post(LABEL_DEFAULT, { label: name });
  const { status, labels } = response.data;
  if (status) {
    return labels;
  }
  return null;
};

// DELETE
export const deleteMeme = async (id) => {
  const deletedMeme = await http.delete(`${MEME_DEFAULT}/${id}`);
  const { status, response } = deletedMeme.data;
  if (status) {
    return response;
  }
  return null;
};
