const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { validRegisterData } = require('./validation');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const validData = validRegisterData({ ...req.body });
      if (validData) {
        return done(validData, null);
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return done(null, false);
      }
      // Generating user password hash, using 10 salt round
      const hash = await bcrypt.hash(password, 10);

      const newUser = await new User({
        username,
        password: hash,
      }).save();

      return done(null, newUser);
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      const existingUser = await User.findOne({ username, removed: false });
      if (!existingUser) {
        return done(null, false);
      }
      if (!existingUser.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, existingUser);
    },
  ),
);
