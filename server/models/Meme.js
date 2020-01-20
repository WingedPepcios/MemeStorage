const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
  disabledFromStats: {
    type: Boolean,
    default: false,
  },
});

Meme.plugin(mongoosePaginate);

mongoose.model('meme', Meme);
