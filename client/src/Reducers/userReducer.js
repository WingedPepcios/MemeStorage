import { SET_USER_DATA, DELETE_USER_DATA } from '../Types/Reducers';

import { setUserId } from '../Utils/Analytics';

const userReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DATA: {
      setUserId(payload.username);

      return {
        ...state,
        ...payload,
      };
    }
    case DELETE_USER_DATA:
      return null;
    default:
      return state;
  }
};

export default userReducer;
