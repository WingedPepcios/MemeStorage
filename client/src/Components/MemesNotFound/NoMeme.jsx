import React from 'react';

import './NoMeme.scss';

const NoMeme = ({ isUser }) => (
  <section className="meme-list__empty">
    {
      isUser
        ? (
          <>
            <div className="mb-3">Brak memów :(</div>
            <div><strong>Teraz pora na Ciebie, aby dodać kolejne!</strong></div>
          </>
        )
        : <div className="--area">Nie ma memika :(</div>
    }
  </section>
);

export default NoMeme;
