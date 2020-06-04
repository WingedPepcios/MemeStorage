import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { dispatchMemes } from '../../Actions/Dispatch';
import UserMeme from './UserMeme';
import NoMeme from '../MemesNotFound/NoMeme';
import { Pagination } from '../Pagination';

import './UserMemes.scss';

const UserMemes = () => {
  const { user, userMemes } = useSelector((state) => state);
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.username) {
      const query = queryString.parse(search, { arrayFormat: 'comma' });
      dispatch(dispatchMemes(query, user.username));
    }
  }, [user, user.username, search, dispatch]);

  return (
    <section className="user_memes">
      {
        userMemes
          ? (
            <>
              <div className="headline">Memy użytkownika</div>
              {userMemes.map((meme) => {
                const {
                  _id,
                  url,
                  title,
                  memePrivileges,
                  reactions,
                  tags,
                } = meme;
                return (
                  <UserMeme
                    key={_id}
                    id={_id}
                    url={url}
                    title={title}
                    memePrivileges={memePrivileges}
                    reactions={reactions}
                    tags={tags}
                  />
                );
              })}
              <Pagination />
            </>
          )
          : <NoMeme isUser />
      }
    </section>
  );
};

export default UserMemes;
