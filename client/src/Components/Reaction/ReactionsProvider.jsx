/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Reaction from './Reaction';

import { postMemeReaction } from '../../Actions';

const ReactionsProvider = ({
  positive,
  negative,
  clickable,
  callback,
  id,
}) => {
  const [stonks, setStonks] = useState(positive);
  const [notStonks, setNotStonks] = useState(negative);

  const vote = async (reaction) => {
    const response = await postMemeReaction(id, { reaction });
    if (response) {
      setStonks(response.reactions.positive);
      setNotStonks(response.reactions.negative);
      if (callback) callback();
    }
  };

  return (
    <div className="reactions d-flex align-items-scretch mb-3">
      <Reaction
        onClick={clickable ? () => vote('stonks') : false}
        positive
        reaction={stonks}
      >
        stonks
      </Reaction>
      <Reaction
        onClick={clickable ? () => vote('notStonks') : false}
        reaction={notStonks}
      >
        not stonks
      </Reaction>
    </div>
  );
};

export default ReactionsProvider;
