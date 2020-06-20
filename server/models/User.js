const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  // email: {
  //   type: String,
  //   unique: true,
  //   trim: true,
  //   lowercase: true,
  //   match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  // },
  isAdmin: { type: Boolean, default: false },
  privileges: { type: Number, default: 0 },
  avatar: { type: String, default: '/users/default.png' },
  removed: {
    type: Boolean,
    default: false,
  },
});

User.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('user', User);
