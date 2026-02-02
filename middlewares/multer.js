const multer = require("multer");

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB video
  },
});

module.exports = upload;
