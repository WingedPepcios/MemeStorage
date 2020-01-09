const { Router } = require('express');
const { requireLogin } = require('../middleware/login');
const upload = require('../middleware/upload');

const {
  addMeme,
  removeMeme,
  findAll,
  updateMeme,
} = require('../controllers/memeController');

module.exports = () => {
  const api = Router();

  // POST /memes
  api.post('/', requireLogin, upload.single('image'), addMeme);

  // DELETE /
  api.delete('/', requireLogin, removeMeme);

  // GET /
  api.get('/', findAll);

  // GET //:user
  api.get('/:user', requireLogin, findAll);

  // POST
  api.post('/:id', requireLogin, updateMeme);

  return api;
};
