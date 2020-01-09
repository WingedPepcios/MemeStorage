const mongoose = require('mongoose');

const { Schema } = mongoose;

const Reaction = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  meme: {
    type: Schema.ObjectId,
    ref: 'Meme',
  },
  reaction: {
    type: String,
    required: true,
  },
});

mongoose.model('reaction', Reaction);
