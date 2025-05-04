const multer = require("multer");
const base = "asset/ekeditor/";
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destination = base;
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }
    cb(null, "asset/ekeditor/"); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Multer middleware for handling any number of file uploads
const uploadMiddleware = upload.any();

module.exports = uploadMiddleware;
