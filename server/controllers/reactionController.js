/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const Reaction = mongoose.model('reaction');
const Meme = mongoose.model('meme');
const User = mongoose.model('user');

module.exports = {
  addReaction: async (req, res) => {
    const { id } = req.params;
    const { reaction } = req.body;

    const existMeme = await Meme.findOne({ _id: id });

    if (!existMeme) {
      return res.status(404).send({ status: 0, message: `There is no meme with id ${id}` });
    }

    const userReaction = await Reaction.findOne({ user: req.user._id, meme: existMeme._id });

    if (userReaction) {
      if (userReaction.reaction === reaction) {
        return res.status(200).send({ status: 0, message: 'You vote is already added' });
      }
      if (reaction === 'stonks') {
        existMeme.reactions.positive += 1;
        existMeme.reactions.negative -= 1;
      } else {
        existMeme.reactions.positive -= 1;
        existMeme.reactions.negative += 1;
      }
      userReaction.reaction = reaction;
      const responseUserReaction = userReaction.save();

      if (!responseUserReaction) {
        return res.status(404).send({ status: 0, message: 'Oops!' });
      }
    } else if (reaction === 'stonks') {
      existMeme.reactions.positive += 1;
    } else {
      existMeme.reactions.negative += 1;
    }

    const response = new Reaction({
      meme: existMeme._id,
      user: req.user._id,
      reaction,
    }).save();
    if (!response) {
      return res.status(404).send({ status: 0, message: 'Oops!' });
    }

    const responseExitMeme = await existMeme.save();
    if (!responseExitMeme) {
      return res.status(404).send({ status: 0, message: 'Oops!' });
    }
    return res.status(200).send({ status: 1, meme: responseExitMeme });
  },
  countReactions: async () => {},
  getMemeReactionUsers: async (req, res) => {
    const { id } = req.params;
    const { reaction } = req.body;

    const reactionUsers = await Reaction.find({ meme: id, reaction: reaction || 'stonks' }, { user: 1, _id: 0 });
    if (!reactionUsers.length) {
      return res.status(404).send({ status: 0, message: 'There is no reactions!' });
    }
    const userToFind = reactionUsers.map((user) => mongoose.Types.ObjectId(user.user));
    const usersResponse = await User.find({ _id: { $in: userToFind } });

    const users = usersResponse.map((user) => ({ username: user.username }));

    return res.status(200).send({ status: 1, users });
  },
};
