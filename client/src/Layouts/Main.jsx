/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { Meme } from '../Components/Meme';
import { Reactions } from '../Components/Reaction';
import { dispatchMemes } from '../Actions/Dispatch';
import getStringFromDate from '../Utils/StringFromDate';
import { Pagination } from '../Components/Pagination';
import Filters from '../Components/Filters/Filters';

const Main = () => {
  const { memes } = useSelector((state) => state);
  const { filters } = useSelector((state) => state);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { page } = useParams();
  const { search } = useLocation();

  useEffect(() => {
    const query = queryString.parse(search, { arrayFormat: 'comma' });
    dispatch(dispatchMemes(page, query));
  }, [dispatch, page, search]);

  return (
    <div className="row align-items-start">
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
          <Pagination />
        </div>
      ) : null}
      <aside className="aside col-12 col-sm-3">
        <Filters user={user} filters={filters} />
      </aside>
    </div>
  );
};

export default Main;
