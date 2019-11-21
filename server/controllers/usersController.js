const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = {
  findOne: async (req, res, next) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return next();

    const { privileges, isAdmin } = user;

    return res.status(200).send({
      username, privileges, isAdmin,
    });
  },

  findAll: async (req, res) => {
    const users = await User.find().sort({ createdAt: 'desc' });
    const data = users.map((user) => {
      const { username, isAdmin, privileges } = user;
      return { username, isAdmin, privileges };
    });
    return res.status(200).send({ data });
  },

  currentUser: (req, res) => {
    const { user } = req;
    if (user) {
      return res.send({ isLogged: true, user });
    }
    return res.send({ isLogged: false });
  },
};
