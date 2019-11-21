/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const settings = require('./config');
// const { notFound, catchErrors } = require('./middleware/errors');

// DG Connect
mongoose.connect(settings.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log('Error msg: ', err);
  console.log('Couldn\'t connect to the database. Exiting now...');
  process.exit();
});

// Express
const app = express();

// app.use(notFound);
// app.use(catchErrors);


app.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});


// Listen port
app.listen(settings.PORT, () => {
  console.log('Server UP!');
});
