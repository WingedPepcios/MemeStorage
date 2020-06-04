import { SET_USER_MEMES } from '../Types/Reducers';

const userMemesReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_MEMES:
      return payload;
    default:
      return state;
  }
};

export default userMemesReducer;