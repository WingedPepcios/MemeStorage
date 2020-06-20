const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const { fieldname } = file;
    switch (fieldname) {
      case 'meme':
        cb(null, `${req.user.username}_${Date.now()}.${file.mimetype.split('/')[1]}`);
        break;
      case 'avatar':
        cb(null, `${req.user.username}_avatar.${file.mimetype.split('/')[1]}`);
        break;
      default:
        cb(null, `${req.user.username}_${Date.now()}.${file.mimetype.split('/')[1]}`);
        break;
    }
  },
  destination: (req, file, cb) => {
    const { fieldname } = file;
    switch (fieldname) {
      case 'meme':
        cb(null, path.resolve(__dirname, '../data/images'));
        break;
      case 'avatar':
        cb(null, path.resolve(__dirname, '../data/users'));
        break;
      default:
        cb(null, path.resolve(__dirname, '../data/images'));
        break;
    }
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
