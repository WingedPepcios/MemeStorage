const { Router } = require('express');
const {
  findOne,
  findAll,
  currentUser,
  loginUser,
  registerUser,
  logout,
} = require('../controllers/usersController');

module.exports = () => {
  const api = Router();

  // GET /users/:username
  api.get('/:username', findOne);

  // GET /users
  api.get('/', findAll);

  // GET /users/current
  api.get('/current', currentUser);

  // GET /users/logout
  api.get('/logout', logout);

  // POST /users/register
  api.post('/register', registerUser);

  // POST /users/register
  api.post('/login', loginUser);

  return api;
};
