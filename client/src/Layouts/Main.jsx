/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Meme } from '../Components/Meme';
import { dispatchMemes } from '../Actions/Dispatch';
import getStringFromDate from '../Utils/StringFromDate';
import Donate from '../Components/Donate/Donate';

const Main = () => {
  const { memes } = useSelector((state) => state);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchMemes());
  }, [dispatch]);

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
              reactions,
            } = meme;
            return (
              <Meme
                key={_id}
                id={_id}
                author={author}
                url={url}
                title={title}
                date={getStringFromDate(date)}
                labels={memePrivileges}
                reactions={reactions}
                isUser={!user === false}
                isLinked
              />
            );
          })}
        </div>
      ) : null}
      <aside className="memes_filters col-12 col-sm-3">
        {/* Filters here */}
        <Donate />
      </aside>
    </div>
  );
};

export default Main;
