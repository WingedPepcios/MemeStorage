/* eslint-disable consistent-return */
const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  next();
};

module.exports = {
  requireLogin,
};
