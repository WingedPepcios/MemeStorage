/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passport');

const settings = require('./config');
const users = require('./routes/users');
// const { notFound, catchErrors } = require('./middleware/errors');

// DG Connect
mongoose.connect(settings.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
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

// app.use(notFound);
// app.use(catchErrors);
app.use('/api/users', users());


app.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});


// Listen port
app.listen(settings.PORT, () => {
  console.log('Server UP!');
});
