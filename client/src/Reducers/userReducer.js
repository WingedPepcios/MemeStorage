import { SET_USER_DATA } from '../Types/Reducers';

const userReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...payload,
      }
    default:
      return state;
  }
};

export default userReducer;
