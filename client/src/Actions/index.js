import http from '../Utils/Instance';
import { USER_CURRENT, USER_DEFAULT } from '../Types/UserApi';

// GET
export const getCurrentUserData = async () => {
  const response = await http.get(USER_CURRENT);
  const { status, user } = response.data;
  if (status) {
    return user;
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
