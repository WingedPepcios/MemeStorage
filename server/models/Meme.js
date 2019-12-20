const mongoose = require('mongoose');

const { Schema } = mongoose;

const Meme = new Schema({
  authorId: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  author: String,
  url: {
    type: String,
  },
  title: {
    type: String,
    default: 'Default name',
  },
  tags: [],
  memePrivileges: { type: Number, default: 0 },
});

mongoose.model('meme', Meme);
