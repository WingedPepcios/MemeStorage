const { Router } = require('express');
const {
  findOne,
  findAll,
  currentUser,
  loginUser,
  registerUser,
  removeUser,
  logout,
} = require('../controllers/usersController');

const { requireLogin, requireAdmin } = require('../middleware/login');

module.exports = () => {
  const api = Router();

  // GET /users/:username
  api.get('/:username', requireLogin, findOne);

  // GET /users
  api.get('/', requireLogin, requireAdmin, findAll);

  // GET /users/current
  api.get('/current', requireLogin, currentUser);

  // GET /users/logout
  api.get('/logout', logout);

  // POST /users/register
  api.post('/register', registerUser);

  // POST /users
  api.post('/', loginUser);

  // DELETE /users/:username
  api.delete('/:username', requireLogin, removeUser);

  return api;
};
