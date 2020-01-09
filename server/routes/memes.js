const { Router } = require('express');
const { requireLogin } = require('../middleware/login');
const upload = require('../middleware/upload');

const {
  addMeme,
  removeMeme,
  findAll,
  updateMeme,
} = require('../controllers/memeController');
const {
  addReaction,
} = require('../controllers/reactionController');
const {
  MEME_DEFAULT,
  MEME_BY_ID,
  MEME_BY_USER,
  MEME_VOTE,
} = require('../templates/types/memeTypes');

module.exports = () => {
  const api = Router();

  // POST /memes
  api.post(MEME_DEFAULT, requireLogin, upload.single('image'), addMeme);

  // DELETE /
  api.delete(MEME_BY_ID, requireLogin, removeMeme);

  // GET /
  api.get(MEME_DEFAULT, findAll);

  // GET //:user
  api.get(MEME_BY_USER, requireLogin, findAll);

  // POST
  api.post(MEME_BY_ID, requireLogin, updateMeme);

  // POST /vote/:id?reaction
  api.post(MEME_VOTE, requireLogin, addReaction);

  return api;
};
