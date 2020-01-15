import React from 'react';
import { useSelector } from 'react-redux';
import Modal from './Modal';

const ModalProvider = () => {
  const { modals } = useSelector((state) => state);
  return (
    <div className="modals">
      {
        modals.length
          ? <Modal callback={modals[0].callback} args={modals[0].args} />
          : null
      }
    </div>
  );
};

export default ModalProvider;
