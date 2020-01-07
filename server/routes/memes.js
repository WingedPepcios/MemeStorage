const { Router } = require('express');
const { requireLogin } = require('../middleware/login');
const upload = require('../middleware/upload');

const {
  addMeme,
  removeMeme,
  findAll,
  findOne,
} = require('../controllers/memeController');

module.exports = () => {
  const api = Router();

  // POST /memes
  api.post('/', requireLogin, upload.single('image'), addMeme);

  // DELETE /
  api.delete('/', requireLogin, removeMeme);

  // GET /
  api.get('/', findAll);

  // GET //:meme
  api.get('/:meme', requireLogin, findOne);

  return api;
};
