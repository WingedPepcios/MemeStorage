/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const pathFix = require('path');
const fs = require('fs');

const Meme = mongoose.model('meme');
const Tag = mongoose.model('tag');

const { PAGE_MAIN } = require('../templates/types').pages;

module.exports = {
  addMeme: async (req, res) => {
    const { path } = req.file;
    const { _id, privileges, username } = req.user;
    const { title, setPrivileges, tags } = req.body;

    const data = {};
    if (title) {
      data.title = title;
    }
    if (setPrivileges && privileges >= setPrivileges) {
      data.memePrivileges = setPrivileges;
    }
    if (tags) {
      const tagsData = JSON.parse(tags);
      await Tag.updateMany({
        _id: {
          $in: tagsData.map((tag) => mongoose.Types.ObjectId(tag.id)),
        },
      }, {
        $addToSet: { priviliges: setPrivileges },
      });
      data.tags = tagsData.map((tag) => ({
        ...tag,
        priviliges: [
          ...new Set(tag.priviliges ? [...tag.priviliges, setPrivileges] : setPrivileges),
        ],
      }));
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

    await fs.unlink(pathFix.join(pathFix.resolve(__dirname, '../data/'), meme.url), (err) => console.log(err));

    const response = await meme.remove();
    if (!response) {
      return res.status(404).send({ status: 0, message: 'Ups! There is some problem with this meme' });
    }
    return res.status(200).send({ status: 1, response });
  },
  findAll: async (req, res) => {
    const { user } = req.params;
    const { page, labels, permsLevel } = req.query;
    const privileges = req.user ? req.user.privileges : 0;

    const perms = permsLevel ? typeof permsLevel === 'string' ? [permsLevel] : permsLevel : [];
    const labelsArray = labels ? typeof labels === 'string' ? [labels] : labels : [];

    const permissions = (
      perms
      && perms.filter((lvl) => lvl <= privileges).length
    );

    const filter = {};
    if (permissions) {
      filter.memePrivileges = { $in: perms.filter((lvl) => lvl <= privileges) };
    } else {
      filter.memePrivileges = { $lte: privileges };
    }
    if (user) {
      filter.author = user;
    }
    if (labelsArray && labelsArray.length) {
      filter['tags.name'] = { $in: labelsArray };
    }

    const options = {
      limit: 20,
      page: page || 1,
      sort: { date: -1 },
      populate: {
        path: 'authorId',
        select: { avatar: 1, username: 1 },
      },
      select: {
        _id: 1,
        url: 1,
        author: 1,
        title: 1,
        date: 1,
        memePrivileges: 1,
        reactions: 1,
        tags: 1,
      },
    };

    const memes = await Meme.paginate(filter, options);
    if (!memes.docs.length) {
      return res.status(404).send({ status: 0, message: 'Ups! There is no meme for you' });
    }

    const tagPriv = permissions
      ? { $in: perms.filter((lvl) => lvl <= privileges) }
      : { $lte: privileges };
    const tags = await Tag.find({ priviliges: tagPriv }, { name: 1, _id: 0 });

    const {
      docs,
      totalDocs,
      totalPages,
      nextPage,
      prevPage,
    } = memes;

    const result = {
      status: 1,
      memes: docs,
      pagination: {
        count: totalDocs,
        total: totalPages,
        next: nextPage,
        prev: prevPage,
        page: memes.page,
      },
      filters: {
        labels: tags.map(
          (tag) => ({
            name: tag.name,
            isActive: labelsArray.filter((label) => label === tag.name).length ? true : false,
          }),
        ),
      },
    };

    return res.status(200).send(result);
  },
  findOne: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.redirect(301, PAGE_MAIN);
    }
    const privileges = req.user ? req.user.privileges : 0;
    const meme = await Meme.findOne({ _id: id, memePrivileges: { $lte: privileges } }).populate({
      path: 'authorId',
      select: { username: 1, avatar: 1 },
    });

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

    const { title, setPrivileges, tags } = req.body;
    if (title) meme.title = title;
    if (tags) meme.tags = tags;
    if (setPrivileges) {
      meme.memePrivileges = setPrivileges;
      await Tag.updateMany({
        _id: {
          $in: tags.map((tag) => mongoose.Types.ObjectId(tag.id)),
        },
      }, {
        $addToSet: { priviliges: setPrivileges },
      });
    }

    const response = await meme.save();
    if (!response) {
      return res.status(404).send({ status: 0, message: 'Ups! There is some problem with this meme' });
    }
    return res.status(200).send({ status: 1, response });
  },
  getFilters: async (req, res) => {
    const privileges = req.user ? req.user.privileges : 0;
    const tags = await Tag.find({ privileges: { $lte: privileges } });

    const filters = {};
    if (tags && tags.length) {
      filters.labels = tags;
    }

    return res.status(200).send({ status: 1, filters });
  },
};
