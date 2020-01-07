import { SET_MEMES_ARRAY } from '../Types/Reducers';

const memeReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MEMES_ARRAY:
      return [
        ...payload,
      ];
    default:
      return state;
  }
};

export default memeReducer;
