/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { MEME_PAGE } from '../../Types/Routes';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import './Meme.scss';

const Meme = ({
  id,
  title,
  author,
  url,
  date,
  labels,
  isLinked,
  tags,
  avatar,
}) => (
  <section className="meme mb-3">
    <div className="meme__description row align-items-center mb-3">
      <div className="meme__author-avatar">
        <LazyLoadImage
          alt={author}
          src={avatar}
          effect="opacity"
        />
      </div>
      <div className="meme__description-right">
        <div className="meme__title mb-2">
          {
            isLinked
              ? (
                <Link to={`${MEME_PAGE}/${id}`}>{title}</Link>
              )
              : (
                <strong>{title}</strong>
              )
          }
        </div>
        <div className="meme__bottom">
          <i className="meme__date mr-3">{date}</i>
          <span className="meme__author">
            <span>Autor: </span>
            <strong>{author}</strong>
          </span>
        </div>
      </div>
    </div>
    <div className={`meme__image ${labels ? 'meme__danger' : ''}`}>
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
        {
          isLinked
            ? (
              <Link to={`${MEME_PAGE}/${id}`}>
                <LazyLoadImage
                  alt={title}
                  src={url}
                  effect="opacity"
                />
              </Link>
            )
            : (
              <LazyLoadImage
                alt={title}
                src={url}
                effect="opacity"
              />
            )
        }
      </figure>
      {
        tags && tags.length
          ? (
            <div className="meme__tags">
              {
                tags.map((label) => <span key={label.id} className="meme__tag">{label.name}</span>)
              }
            </div>
          )
          : null
      }
    </div>
  </section>
);

export default Meme;
