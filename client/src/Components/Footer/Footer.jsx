/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import './Footer.scss';

const Footer = () => (
  <footer className="container py-3 mt-5">
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div className="mb-3">Copyright © <strong>winged.pl</strong> 2020</div>
      <i>Administrator nie ponosi odpowiedzialności za treści na stronie.<br/>Kontakt i informacje: <a href="mailto:kontakt@winged.pl">kontakt@winged.pl</a></i>
    </div>
  </footer>
);

export default Footer;
