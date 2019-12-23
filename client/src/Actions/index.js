import http from '../Utils/Instance';
import { USER_CURRENT } from '../Types/UserApi';

export const getCurrentUserData = async () => {
  const data = await http.get(USER_CURRENT);
  if (data.state) {
    return data.user;
  }
  return null;
};
