const { Router } = require('express');
const {
  findOne,
  findAll,
  currentUser,
  loginUser,
  registerUser,
  removeUser,
  logout,
  update,
} = require('../controllers/usersController');
const {
  USER_NAME,
  USER_CURRENT,
  USER_LOGOUT,
  USER_REGISTER,
  USER_DEFAULT,
} = require('../templates/types').api;

const { requireLogin, requireAdmin } = require('../middleware/login');

module.exports = () => {
  const api = Router();

  // GET /users/:username
  api.get(USER_NAME, requireLogin, findOne);

  // GET /users
  api.get(USER_DEFAULT, requireLogin, requireAdmin, findAll);

  // GET /users/current
  api.get(USER_CURRENT, requireLogin, currentUser);

  // GET /users/logout
  api.get(USER_LOGOUT, logout);

  // POST /users/register
  api.post(USER_REGISTER, registerUser);

  // POST /users
  api.post(USER_DEFAULT, loginUser);

  // PUT /users/:username?values
  api.put(USER_NAME, requireLogin, update);

  // DELETE /users/:username
  api.delete(USER_NAME, requireLogin, removeUser);

  return api;
};
