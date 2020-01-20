import { SET_MODAL, POP_MODAL } from '../Types/Reducers';

const modalReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MODAL:
      return [
        ...state,
        payload,
      ];
    case POP_MODAL: {
      const arr = [...state];
      arr.shift();
      return arr;
    }
    default:
      return state;
  }
};

export default modalReducer;
