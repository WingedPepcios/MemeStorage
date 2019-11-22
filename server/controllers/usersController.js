/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('user');

module.exports = {
  findOne: async (req, res, next) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return next();

    const { privileges, isAdmin } = user;

    return res.status(200).send({
      username, privileges, isAdmin,
    });
  },

  findAll: async (req, res) => {
    const users = await User.find().sort({ createdAt: 'desc' });
    const data = users.map((user) => {
      const { username, isAdmin, privileges } = user;
      return { username, isAdmin, privileges };
    });
    return res.status(200).send({ data });
  },

  currentUser: (req, res) => {
    const { user } = req;
    if (user) {
      const { username, isAdmin, privileges } = user;
      return res.send({ isLogged: true, user: { username, isAdmin, privileges } });
    }
    return res.send({ isLogged: false });
  },

  loginUser: (req, res) => {
    passport.authenticate('login', (err, user) => {
      if (!user) {
        return res.send({ message: 'Incorrect data' });
      }
      req.logIn(user, () => {
        const { username, isAdmin, privileges } = user;
        return res.send({ user: { username, isAdmin, privileges } });
      });
    })(req, res);
  },

  registerUser: (req, res) => {
    passport.authenticate('register', (err, user) => {
      if (!user) {
        return res.send({ message: 'Already exist!' });
      }
      req.logIn(user, () => {
        const { username, isAdmin, privileges } = user;
        return res.send({ user: { username, isAdmin, privileges } });
      });
    })(req, res);
  },

  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  },

  removeUser: async (req, res, next) => {
    const { user } = req;
    const { username } = req.params;
    if (user.username === username || user.isAdmin) {
      const findUser = await User.findOne({ username });
      if (!findUser) return res.status(404).send({ message: 'User doesn\'t exist!' });
      await findUser.remove();

      if (user.username === username) {
        req.logout();
      }

      return res.status(200).send({ message: 'Removed successful!' });
    }
    return next();
  },
};
