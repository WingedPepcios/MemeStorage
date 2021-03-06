const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Meme = new Schema({
  authorId: {
    type: Schema.ObjectId,
    ref: 'user',
  },
  author: String,
  url: {
    type: String,
  },
  title: {
    type: String,
    default: 'Default name',
  },
  tags: [{
    name: String,
    id: {
      type: Schema.ObjectId,
      ref: 'Tag',
    },
  }],
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
