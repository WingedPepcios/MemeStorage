/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const pathFix = require('path');

const Meme = mongoose.model('meme');

const { PAGE_MAIN } = require('../templates/types').pages;

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
  removeMeme: async (req, res) => {
    const { id } = req.params;
    const meme = await Meme.findOne({ _id: id });

    if (!meme) {
      return res.status(404).send({ status: 0, message: 'Meme not found!' });
    }

    if (JSON.stringify(meme.authorId) !== JSON.stringify(req.user._id)) {
      return res.status(401).send({ status: 0, message: 'Access Denied!' });
    }

    const response = await meme.remove();
    if (!response) {
      return res.status(404).send({ status: 0, message: 'Ups! There is some problem with this meme' });
    }
    return res.status(200).send({ status: 1, response });
  },
  findAll: async (req, res) => {
    const { user } = req.params;
    const { page } = req.query;
    const privileges = req.user ? req.user.privileges : 0;
    const filter = {
      memePrivileges: { $lte: privileges },
    };
    if (user) {
      filter.author = user;
    }
    // const memes = await Meme.find(filter, {
    //   _id: 1,
    //   url: 1,
    //   author: 1,
    //   title: 1,
    //   date: 1,
    //   memePrivileges: 1,
    //   reactions: 1,
    // }, { sort: { date: -1 } });

    const options = {
      limit: 20,
      page: page || 1,
      sort: { date: -1 },
      select: {
        _id: 1,
        url: 1,
        author: 1,
        title: 1,
        date: 1,
        memePrivileges: 1,
        reactions: 1,
      },
    };

    const memes = await Meme.paginate(filter, options);

    if (!memes.docs.length) {
      return res.status(404).send({ status: 0, message: 'Ups! There is no meme for you' });
    }
    const {
      docs,
      totalDocs,
      totalPages,
      nextPage,
      prevPage,
    } = memes;

    return res.status(200).send({
      status: 1,
      memes: docs,
      pagination: {
        count: totalDocs,
        total: totalPages,
        next: nextPage,
        prev: prevPage,
        page: memes.page,
      },
    });
  },
  findOne: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.redirect(301, PAGE_MAIN);
    }
    const privileges = req.user ? req.user.privileges : 0;
    const meme = await Meme.findOne({ _id: id, memePrivileges: { $lte: privileges } });

    if (!meme) {
      return res.status(404).send({ status: 0, message: 'Meme not found!' });
    }

    return res.status(200).send({ status: 1, meme });
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
      return res.status(404).send({ status: 0, message: 'Ups! There is some problem with this meme' });
    }
    return res.status(200).send({ status: 1, response });
  },
};
