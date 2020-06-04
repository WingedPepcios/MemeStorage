/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { validRegisterData } = require('../services/validation');

const User = mongoose.model('user');

module.exports = {
  findOne: async (req, res, next) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return next();

    const { privileges, isAdmin } = user;

    return res.status(200).send({
      status: 1,
      user: {
        username,
        privileges,
        isAdmin,
      },
    });
  },

  findAll: async (req, res) => {
    const { includeRemoved } = req.query;
    const findQuery = includeRemoved ? {} : { removed: false };
    const users = await User.find(findQuery).sort({ createdAt: 'desc' });
    const data = users.map((user) => {
      const {
        username,
        isAdmin,
        privileges,
        removed,
      } = user;
      return {
        username,
        isAdmin,
        privileges,
        removed,
      };
    });
    return res.status(200).send({ status: 1, users: data });
  },

  currentUser: (req, res, next) => {
    const { user } = req;
    if (user) {
      const { username, isAdmin, privileges } = user;
      return res.send({ status: 1, user: { username, isAdmin, privileges } });
    }
    return next();
  },

  loginUser: (req, res) => {
    passport.authenticate('login', (err, user) => {
      if (!user) {
        return res.send({ status: 0, message: 'Incorrect data' });
      }
      req.logIn(user, () => {
        const { username, isAdmin, privileges } = user;
        return res.send({ status: 1, user: { username, isAdmin, privileges } });
      });
    })(req, res);
  },

  registerUser: (req, res) => {
    passport.authenticate('register', (err, user) => {
      if (err) {
        return res.status(200).send({ status: 0, errors: err });
      }
      if (!user) {
        return res.send({ status: 0, message: 'Already exist!' });
      }
      req.logIn(user, () => {
        const { username, isAdmin, privileges } = user;
        return res.status(201).send({ status: 1, user: { username, isAdmin, privileges } });
      });
    })(req, res);
  },

  logout: (req, res) => {
    req.logout();
    res.status(200).send({ status: 1, message: 'Logged out sucessful', redirect: '/' });
  },

  removeUser: async (req, res, next) => {
    const { user } = req;
    const { username } = req.params;
    if (user.username === username || user.isAdmin) {
      const findUser = await User.findOne({ username });
      if (!findUser) {
        return res.status(404).send({ status: 0, message: 'User doesn\'t exist!' });
      }

      findUser.removed = true;
      await findUser.save();

      if (user.username === username) {
        req.logout();
      }

      return res.status(200).send({ status: 1, message: 'Removed successful!' });
    }
    return next();
  },

  update: async (req, res, next) => {
    const { user } = req;
    const { username } = req.params;
    if (user.username === username || user.isAdmin) {
      const userToUpdate = await User.findOne({ username });
      if (!userToUpdate) {
        return res.status(404).send({ status: 0, message: 'User not found!' });
      }

      const { password, passwordRepeat } = req.body;
      const validData = validRegisterData({ password, passwordRepeat });
      if (validData) {
        return res.status(200).send({ status: 0, errors: validData });
      }

      if (password) {
        const hash = await bcrypt.hash(password, 10);
        userToUpdate.password = hash;
      }

      userToUpdate.save();

      return res.status(200).send({ status: 1, message: 'Updated sucessful' });
    }
    return next();
  },

  validData: (req, res) => {
    const validData = validRegisterData({ ...req.query });
    if (validData) {
      return res.status(200).send({ status: 0, errors: validData });
    }
    return res.status(200).send({ status: 1, message: 'Correct' });
  },
};
