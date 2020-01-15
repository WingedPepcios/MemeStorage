/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { postMemeReaction } from '../../Actions';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import './Meme.scss';

const Meme = ({
  id,
  title,
  author,
  url,
  date,
  labels,
  reactions,
  isUser,
}) => {
  const [stonks, setStonks] = useState(reactions.positive);
  const [notStonks, setNotStonks] = useState(reactions.negative);

  const vote = async (reaction) => {
    const response = await postMemeReaction(id, { reaction });
    if (response) {
      const { positive, negative } = response.reactions;
      setStonks(positive);
      setNotStonks(negative);
    }
  };

  return (
    <section className="meme mb-5">
      <div className="meme__description mb-3">
        <div className="meme__title mb-2"><strong>{title}</strong></div>
        <div className="meme__bottom">
          <i className="meme__date mr-3">{date}</i>
          <span className="meme__author">
            <span>Autor: </span>
            <strong>{author}</strong>
          </span>
        </div>
      </div>
      <div className={`meme__image ${labels ? 'meme__danger' : null}`}>
        {labels ? (
          <div className={`meme__label d-flex justify-content-start security_${labels}`}>
            <span>
              {
                labels === 1
                  ? 'Wtajemniczeni'
                  : labels === 2
                    ? 'Ostrożnie!'
                    : null
              }
            </span>
          </div>
        ) : null}
        <figure className="p-3 p-sm-5 d-flex justify-content-center">
          <LazyLoadImage
            alt={title}
            src={url}
            effect="opacity"
          />
        </figure>
      </div>
      {
        isUser
          ? (
            <div className="meme__reactions d-flex align-items-scretch">
              <button type="button" className="reaction d-flex align-items-center --positive" onClick={() => vote('stonks')}>
                <span className="reaction__icon"><i className="far fa-laugh-squint" /></span>
                <div className="reaction__desc">
                  <div className="reaction__value">{stonks}</div>
                  <span className="reaction__name">stonks</span>
                </div>
              </button>
              <button type="button" className="reaction d-flex align-items-center --negative" onClick={() => vote('notStonks')}>
                <span className="reaction__icon"><i className="far fa-tired" /></span>
                <div className="reaction__desc">
                  <div className="reaction__value">{notStonks}</div>
                  <span className="reaction__name">not stonks</span>
                </div>
              </button>
            </div>
          )
          : null
      }
    </section>
  );
};

export default Meme;
