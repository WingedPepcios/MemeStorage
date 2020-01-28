const { Router } = require('express');
const { requireLogin } = require('../middleware/login');

const {
  findTag,
  addTag,
} = require('../controllers/tagController');

const {
  LABEL_NAME,
  LABEL_DEFAULT,
} = require('../templates/types/tagTypes');

module.exports = () => {
  const api = Router();

  // GET
  api.get(LABEL_NAME, findTag);

  // POST
  api.post(LABEL_DEFAULT, requireLogin, addTag);

  return api;
};
