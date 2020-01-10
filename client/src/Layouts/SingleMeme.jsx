import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMeme } from '../Actions';

const SingleMeme = () => {
  const [singleMeme, setSingleMeme] = useState(null);
  const { id } = useParams();

  useEffect(async () => {
    if (id) {
      const response = getMeme(id);
      if (response) {
        setSingleMeme(response);
      }
    }
  }, [id]);

  return (
    <section>
      {
        singleMeme
          ? (
            <div>Coś</div>
          )
          : null
      }
    </section>
  );
};

export default SingleMeme;
