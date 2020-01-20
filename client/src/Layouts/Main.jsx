/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Meme } from '../Components/Meme';
import { Reactions } from '../Components/Reaction';
import { dispatchMemes } from '../Actions/Dispatch';
import getStringFromDate from '../Utils/StringFromDate';

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
              <div key={_id} className="mb-5">
                <Meme
                  id={_id}
                  author={author}
                  url={url}
                  title={title}
                  date={getStringFromDate(date)}
                  labels={memePrivileges}
                  isLinked
                />
                <Reactions
                  id={_id}
                  positive={reactions.positive}
                  negative={reactions.negative}
                  clickable={user}
                />
              </div>
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
