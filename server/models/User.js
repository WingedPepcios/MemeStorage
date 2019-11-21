const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  privileges: { type: Number, default: 0 },
});

mongoose.model('user', User);
