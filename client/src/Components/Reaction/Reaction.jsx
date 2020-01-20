/* eslint-disable react/prop-types */
import React from 'react';

import './Reaction.scss';

const Reaction = ({
  onClick,
  positive,
  classes,
  reaction,
  children,
}) => {
  const className = `reaction d-flex align-items-center ${positive ? '--positive' : '--negative'} ${classes ? classes : ''}`

  const getContent = () => (
    <>
      <span className="reaction__icon">
        <i className={`far ${positive ? 'fa-laugh-squint' : 'fa-tired'}`} />
      </span>
      <div className="reaction__desc">
        <div className="reaction__value">{reaction}</div>
        <span className="reaction__name">{children}</span>
      </div>
    </>
  )
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {getContent()}
      </button>
    );
  }
  return (
    <div className={className}>
      {getContent()}
    </div>
  );
};

export default Reaction;
