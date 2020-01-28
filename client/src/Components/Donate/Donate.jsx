import React from 'react';

import './Donate.scss';

const Donate = () => (
  <section className="donate mb-5">
    <div className="headline">
      <strong>Dorzuć grosza do serwera</strong>
      <small>Portfelem potrząśnij...</small>
    </div>
    <div className="donate__image">
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="G9ASVUST4EPQW" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_PL/i/scr/pixel.gif" width="1" height="1" />
      </form>
    </div>
  </section>
);

export default Donate;
