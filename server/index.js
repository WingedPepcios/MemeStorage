/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');


require('./models/Tag');
require('./models/User');
require('./models/Meme');
require('./models/Reaction');
require('./services/passport');

const settings = require('./config');
const users = require('./routes/users');
const memes = require('./routes/memes');
const { PAGE_DASHBOARD, PAGE_LOGIN, PAGE_REGISTER } = require('./templates/types').pages;
const { PRODUCTION } = require('./templates/constants');
// const { notFound, catchErrors } = require('./middleware/errors');

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

// DG Connect
mongoose.connect(settings.DB_URI, options);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log('Error msg: ', err);
  console.log('Couldn\'t connect to the database. Exiting now...');
  process.exit();
});

// Express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [settings.COOKIE_KEY],
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));

// app.use(notFound);
// app.use(catchErrors);

const { user, memeTypes } = require('./templates/types');

app.get(PAGE_DASHBOARD, (req, res, next) => {
  if (!req.user) {
    res.redirect(PAGE_LOGIN);
  } else {
    next();
  }
});

app.get(PAGE_LOGIN, (req, res, next) => {
  if (req.user) {
    res.redirect(PAGE_DASHBOARD);
  } else {
    next();
  }
});

app.get(PAGE_REGISTER, (req, res, next) => {
  if (req.user) {
    res.redirect(PAGE_DASHBOARD);
  } else {
    next();
  }
});

app.use(user.USER_API, users());
app.use(memeTypes.MEME_API, memes());
// require('./routes/account')(app);

if (process.env.NODE_ENV === PRODUCTION) {
  app.use(express.static('./client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./', 'client', 'build', 'index.html'));
  });
}

// Listen port
app.listen(settings.PORT, () => {
  console.log('Server UP on port: ', settings.PORT);
});
