const { Router } = require('express');
const { requireLogin } = require('../middleware/login');
const upload = require('../middleware/upload');

const {
  addMeme,
  removeMeme,
  findAll,
  updateMeme,
  findOne,
} = require('../controllers/memeController');
const {
  addReaction,
  getMemeReactionUsers,
} = require('../controllers/reactionController');
const {
  MEME_DEFAULT,
  MEME_BY_ID,
  MEME_BY_USER,
  MEME_VOTE,
  MEME_ONE_BY_ID,
} = require('../templates/types/memeTypes');

module.exports = () => {
  const api = Router();

  // POST /memes
  api.post(MEME_DEFAULT, requireLogin, upload.single('image'), addMeme);

  // DELETE /
  api.delete(MEME_BY_ID, requireLogin, removeMeme);

  // GET /
  api.get(MEME_DEFAULT, findAll);

  // GET /:user
  api.get(MEME_BY_USER, requireLogin, findAll);

  // GET /meme/:id
  api.get(MEME_ONE_BY_ID, findOne);

  // GET /vote/:id
  api.get(MEME_VOTE, requireLogin, getMemeReactionUsers);

  // POST
  api.post(MEME_BY_ID, requireLogin, updateMeme);

  // POST /vote/:id?reaction
  api.post(MEME_VOTE, requireLogin, addReaction);

  return api;
};
