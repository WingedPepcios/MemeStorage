/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Meme } from '../Components/Meme';
import { Reactions } from '../Components/Reaction';
import { getMeme, getMemeReactions } from '../Actions';
import getStringFromDate from '../Utils/StringFromDate';

const SingleMeme = () => {
  const [singleMeme, setSingleMeme] = useState(null);
  const [singleMemeReaction, setSingleMemeReaction] = useState(null);
  const { user } = useSelector((state) => state);
  const { id } = useParams();

  const getAsyncData = useCallback(
    async () => {
      const response = await getMeme(id);
      const reactions = await getMemeReactions(id);
      if (response) {
        setSingleMeme(response);
      }
      if (reactions) {
        setSingleMemeReaction(reactions);
      }
    },
    [id],
  );

  useEffect(() => {
    if (id) {
      getAsyncData();
    }
  }, [id, getAsyncData]);

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
                isUser={!user === false}
              />
              <Reactions
                id={singleMeme._id}
                positive={singleMeme.reactions.positive}
                negative={singleMeme.reactions.negative}
                clickable={user}
                callback={() => getAsyncData()}
              />
              {
                singleMemeReaction
                  ? (
                    <div className="meme__Likes">
                      <strong>Polubili: </strong>
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
