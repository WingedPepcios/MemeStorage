import { useDispatch } from 'react-redux';

import { SET_MODAL } from '../Types/Reducers';
/**
 * Return function dispatching data for modal provider
 * @param {function} action funciotn callback after positive decision
 * @param {object} data args for callback
 */
const useModal = (action, data) => {
  const dispatch = useDispatch();

  return () => dispatch({
    type: SET_MODAL,
    payload: {
      callback: action,
      args: data,
    },
  });
};

export default useModal;
