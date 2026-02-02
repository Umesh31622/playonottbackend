const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "playon/livestreams",
    resource_type: "auto", // image OR video
  },
});

const upload = multer({ storage });

module.exports = upload;
