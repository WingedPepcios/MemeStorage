const mongoose = require('mongoose');

const Meme = mongoose.model('meme');

module.exports = {
  addMeme: async (req, res) => {
    const { path } = req.file;
    const { _id, privileges, username } = req.user;
    const { title, setPrivileges } = req.body;

    const data = {};
    if (title) {
      data.title = title;
    }
    if (setPrivileges && privileges >= setPrivileges) {
      data.memePrivileges = setPrivileges;
    }

    const newMeme = await new Meme({
      author: username,
      authorId: _id,
      url: path.replace('data\\', '\\'),
      ...data,
    }).save();

    return res.status(201).send({ status: 1, meme: newMeme });
  },
  removeMeme: () => {

  },
  findAll: async (req, res) => {
    const { privileges } = req.user;
    const memes = await Meme.find({ memePrivileges: { $lte: privileges } }, {
      author: 1,
      url: 1,
      title: 1,
      _id: 0,
    });

    if (!memes.length) {
      return res.status(404).send({ status: 0, message: 'Ups! There is no meme for you' });
    }

    return res.status(200).send({ status: 1, memes });
  },
  findOne: () => {

  },
};
