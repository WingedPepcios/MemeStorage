const mongoose = require('mongoose');

const Tag = mongoose.model('tag');

module.exports = {
  findTag: async (req, res) => {
    const { name } = req.params;
    const labels = await Tag.find({ name: new RegExp(name, 'i') }).limit(5);

    if (!labels.length) {
      return res.status(200).send({ status: 0, message: 'No labels finded!' });
    }

    return res.status(200).send({ status: 1, labels });
  },
  addTag: async (req, res) => {
    const { label } = req.body;
    console.log(req.body);
    if (!label) {
      return res.status(200).send({ status: 0, message: 'Name cannot be empty!' });
    }

    const existLabel = await Tag.findOne({ name: label });
    if (existLabel) {
      return res.status(200).send({ status: 1, message: 'Label already exist!', label: existLabel });
    }

    const newLabel = await new Tag({
      name: label,
    }).save();

    return res.status(200).send({ status: 1, label: newLabel });
  },
};
