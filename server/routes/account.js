const path = require('path');
const { requireLogin, requireAdmin } = require('../middleware/login');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('./', 'public', 'login.html'));
  });

  app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./', 'public', 'register.html'));
  });
  app.get('/valid', (req, res) => {
    res.sendFile(path.resolve('./', 'public', 'validate.html'));
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/admin', requireLogin, requireAdmin, (req, res) => {
    res.sendFile(path.resolve('./', 'public', 'panel.html'));
  });

  app.get('/user', requireLogin, (req, res) => {
    res.sendFile(path.resolve('./', 'public', 'userPanel.html'));
  });
  app.get('/memes', requireLogin, (req, res) => {
    res.sendFile(path.resolve('./', 'public', 'memes.html'));
  });
};
