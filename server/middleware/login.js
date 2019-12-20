/* eslint-disable consistent-return */
const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ status: 0, error: 'You must log in!' });
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (req.user && !req.user.isAdmin) {
    return res.status(401).send({ status: 0, error: 'You need admin privileges!' });
  }
  next();
};

module.exports = {
  requireLogin,
  requireAdmin,
};
