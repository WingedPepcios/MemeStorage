/* eslint-disable global-require */
const { PRODUCTION } = require('../templates/constants');

if (process.env.NODE_ENV === PRODUCTION) {
  module.exports = require('./production');
} else {
  module.exports = require('./development');
}
