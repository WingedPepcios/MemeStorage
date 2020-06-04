import { SET_MEMES_PAGIN, CLEAR_MEMES_ARRAY } from '../Types/Reducers';

const paginReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MEMES_PAGIN:
      return payload;
    case CLEAR_MEMES_ARRAY:
      return null;
    default:
      return state;
  }
};

export default paginReducer;
