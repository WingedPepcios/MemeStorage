/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';

import { POP_MODAL } from '../../Types/Reducers';
import './Modal.scss';

const Modal = ({ callback, args }) => {
  const dispatch = useDispatch();

  return (
    <div className="modal">
      <div className="modal__description">Jesteś pewien?</div>
      <div className="modal__action">
        <button
          type="button"
          className="btn --solid"
          onClick={() => {
            callback(args);
            dispatch({ type: POP_MODAL });
          }}
        >
          Tak
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => dispatch({ type: POP_MODAL })}
        >
          Nie
        </button>
      </div>
    </div>
  );
};

export default Modal;
