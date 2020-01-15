import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserMemes } from '../../Actions';
import UserMeme from './UserMeme';

import './UserMemes.scss';

const UserMemes = () => {
  const [userMemes, setUserMemes] = useState(null);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user) {
      const getData = async () => {
        const response = await getUserMemes(user.username);
        setUserMemes(response);
      };
      getData();
    }

    return () => setUserMemes(null);
  }, [user]);

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
                } = meme;
                return (
                  <UserMeme
                    key={_id}
                    id={_id}
                    url={url}
                    title={title}
                    memePrivileges={memePrivileges}
                    reactions={reactions}
                  />
                );
              })}
            </>
          )
          : null
      }
    </section>
  );
};

export default UserMemes;
