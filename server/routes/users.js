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
  validData,
} = require('../controllers/usersController');
const {
  USER_NAME,
  USER_CURRENT,
  USER_LOGOUT,
  USER_REGISTER,
  USER_DEFAULT,
} = require('../templates/types').user;

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

  // GET /users/register?
  api.get(USER_REGISTER, validData);

  // POST /users/register
  api.post(USER_REGISTER, registerUser);

  // POST /users
  api.post(USER_DEFAULT, loginUser);

  // POST /users/:username?values
  api.post(USER_NAME, requireLogin, update);

  // DELETE /users/:username
  api.delete(USER_NAME, requireLogin, removeUser);

  return api;
};
