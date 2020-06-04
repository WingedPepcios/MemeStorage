import { SET_MEMES_FILTERS } from '../Types/Reducers';

const filterReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MEMES_FILTERS:
      return payload;
    default:
      return state;
  }
};

export default filterReducer;
