/* eslint-disable react/prop-types */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import './Meme.scss';

const Meme = ({
  title,
  author,
  url,
  date,
  labels,
}) => (
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
        <div className="meme__label d-flex justify-content-start">
          <span>{labels}</span>
        </div>
      ) : null}
      <figure className="p-5 d-flex justify-content-center">
        <LazyLoadImage
          alt={title}
          src={url}
          effect="opacity"
        />
      </figure>
    </div>
  </section>
);

export default Meme;
