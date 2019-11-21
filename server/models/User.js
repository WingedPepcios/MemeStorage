const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

mongoose.model('user', User);
