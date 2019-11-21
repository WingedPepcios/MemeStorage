const { Router } = require('express');
const { findOne, findAll, currentUser } = require('../controllers/usersController');

module.exports = () => {
  const api = Router();

  // GET /users/:username
  api.get('/:username', findOne);

  // GET /users
  api.get('/', findAll);

  // GET /users/current
  api.get('/current', currentUser);

  return api;
};
