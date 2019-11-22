const path = require('path');
const { requireLogin, requireAdmin } = require('../middleware/login');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('./', 'public', 'login.html'));
  });

  app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./', 'public', 'register.html'));
  });

  app.get('/panel', requireLogin, requireAdmin, (req, res) => {
    res.sendFile(path.resolve('./', 'public', 'panel.html'));
  });
};
