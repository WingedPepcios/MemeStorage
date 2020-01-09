/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const pathFix = require('path');

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
      url: path.replace(pathFix.resolve(__dirname, '../data'), ''),
      date: new Date(),
      ...data,
    }).save();

    return res.status(201).send({ status: 1, meme: newMeme });
  },
  removeMeme: () => {

  },
  findAll: async (req, res) => {
    const { user } = req.params;
    const privileges = req.user ? req.user.privileges : 0;
    const filter = {
      memePrivileges: { $lte: privileges },
    };
    if (user) {
      filter.author = user;
    }

    const memes = await Meme.find(filter, {
      _id: 1,
      url: 1,
      author: 1,
      title: 1,
      date: 1,
      memePrivileges: 1,
    }, { sort: { date: -1 } });

    if (!memes.length) {
      return res.status(404).send({ status: 0, message: 'Ups! There is no meme for you' });
    }

    return res.status(200).send({ status: 1, memes });
  },
  updateMeme: async (req, res) => {
    const { id } = req.params;
    const meme = await Meme.findOne({ _id: id });

    if (JSON.stringify(meme.authorId) !== JSON.stringify(req.user._id)) {
      return res.status(401).send({ status: 0, message: 'Access Denied!' });
    }

    const { title, setPrivileges } = req.body;
    if (title) meme.title = title;
    if (setPrivileges) meme.memePrivileges = setPrivileges;

    const response = await meme.save();
    if (!response) {
      res.status(404).send({ status: 0, message: 'Ups! There is some problem with this meme' });
    }
    return res.status(200).send({ status: 1, response });
  },
};
