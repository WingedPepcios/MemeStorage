/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');


require('./models/User');
require('./models/Meme');
require('./services/passport');

const settings = require('./config');
const users = require('./routes/users');
const memes = require('./routes/memes');
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
app.use(express.static('public'));
app.use(express.static('data'));

// app.use(notFound);
// app.use(catchErrors);

const { user } = require('./templates/types');

app.use(user.USER_API, users());
app.use('/api/memes', memes());
require('./routes/account')(app);

// Listen port
app.listen(settings.PORT, () => {
  console.log('Server UP!');
});
