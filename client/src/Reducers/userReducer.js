import { SET_USER_DATA, DELETE_USER_DATA } from '../Types/Reducers';

const userReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...payload,
      };
    case DELETE_USER_DATA:
      return { isChecked: true };
    default:
      return state;
  }
};

export default userReducer;
