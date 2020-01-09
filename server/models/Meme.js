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
  date: {
    type: Date,
    required: true,
  },
  memePrivileges: { type: Number, default: 0 },
  reactions: {
    positive: {
      type: Number,
      default: 0,
    },
    negative: {
      type: Number,
      default: 0,
    },
  },
});

mongoose.model('meme', Meme);
