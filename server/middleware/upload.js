const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${req.user.username}_${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
  destination: (req, res, cb) => {
    cb(null, path.resolve(__dirname, '../data/images'));
  },
});

const upload = multer({
  storage,
  limits: {
    // fileSize: 4 * 1024 * 1024 * 1024,
    fileSize: 26214400, // 25 Mb
  },
});

module.exports = upload;
