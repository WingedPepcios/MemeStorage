const mongoose = require('mongoose');
require('../models/Tag');
require('../models/Meme');

const DB_URI = 'mongodb+srv://wcluster-ppiska:aXd25oR95j@wcluster0-837u8.mongodb.net/test?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

// DG Connect
mongoose.connect(DB_URI, options);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log('Error msg: ', err);
  console.log('Couldn\'t connect to the database. Exiting now...');
  process.exit();
});

const Tag = mongoose.model('tag');
const Meme = mongoose.model('meme');

const tempUpdateTags = async () => {
  const memes = await Meme.find({});

  memes.forEach(async (meme) => {
    if (meme.tags && meme.tags.length) {
      await Tag.updateMany({
        _id: {
          $in: meme.tags.map((tag) => mongoose.Types.ObjectId(tag.id)),
        },
      }, {
        $addToSet: { priviliges: meme.memePrivileges },
      });
    }
  });
};

try {
  tempUpdateTags();
} catch (e) {
  console.log(e);
}
