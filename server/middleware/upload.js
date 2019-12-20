const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './data/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.username}_${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

module.exports = upload;
