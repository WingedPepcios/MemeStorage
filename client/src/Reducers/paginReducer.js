import { SET_MEMES_PAGIN } from '../Types/Reducers';

const paginReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MEMES_PAGIN:
      return payload;
    default:
      return state;
  }
};

export default paginReducer;
