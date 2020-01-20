/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Meme } from '../Components/Meme';
import { getMeme, getMemeReactions } from '../Actions';
import getStringFromDate from '../Utils/StringFromDate';

const SingleMeme = () => {
  const [singleMeme, setSingleMeme] = useState(null);
  const [singleMemeReaction, setSingleMemeReaction] = useState(null);
  const { user } = useSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    const getAsyncData = async () => {
      if (id) {
        const response = await getMeme(id);
        const reactions = await getMemeReactions(id);
        if (response) {
          setSingleMeme(response);
        }
        if (reactions) {
          setSingleMemeReaction(reactions);
        }
      }
    };
    getAsyncData();
  }, [id]);

  return (
    <section className="meme__wrapper">
      {
        singleMeme
          ? (
            <>
              <Meme
                key={singleMeme._id}
                id={singleMeme._id}
                author={singleMeme.author}
                url={singleMeme.url}
                title={singleMeme.title}
                date={getStringFromDate(singleMeme.date)}
                labels={singleMeme.memePrivileges}
                reactions={singleMeme.reactions}
                isUser={!user === false}
              />
              {
                singleMemeReaction
                  ? (
                    <div className="meme__Likes">
                      <div>Polubili:</div>
                      {
                        singleMemeReaction.map((userReaction, index) => <span key={index} className="meme__stonkser">{userReaction.username}</span>)
                      }
                    </div>
                  )
                  : null
              }
            </>
          )
          : null
      }
    </section>
  );
};

export default SingleMeme;
