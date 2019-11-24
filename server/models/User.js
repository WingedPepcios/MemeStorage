const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: { type: Boolean, default: false },
  privileges: { type: Number, default: 0 },
  removed: {
    type: Boolean,
    default: false,
  },
});

User.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('user', User);
