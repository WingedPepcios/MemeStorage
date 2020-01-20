const mongoose = require('mongoose');

const { Schema } = mongoose;

const Tag = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

mongoose.model('tag', Tag);
