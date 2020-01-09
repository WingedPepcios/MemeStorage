/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Meme } from '../Components/Meme';
import { dispatchMemes } from '../Actions/Dispatch';

const Main = () => {
  const { memes } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchMemes());
  }, [dispatch]);

  const getStringFromDate = (date) => {
    const today = new Date(date);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${dd}.${mm}.${yyyy}`;
  };

  return (
    <div className="row">
      {memes ? (
        <div className="memes_list col-12 col-sm-9">
          {memes.map((meme) => {
            const {
              _id,
              url,
              author,
              title,
              date,
              memePrivileges,
            } = meme;
            return (
              <Meme
                key={_id}
                author={author}
                url={url}
                title={title}
                date={getStringFromDate(date)}
                labels={memePrivileges}
              />
            );
          })}
        </div>
      ) : null}
      <aside className="memes_filters col-12 col-3">
        {/* Filters here */}
      </aside>
    </div>
  );
};

export default Main;
