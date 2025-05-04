const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Base directory for uploads
const base = "uploads/organizations/";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!file) return;

    // Ensure the directory exists
    if (!fs.existsSync(base)) {
      fs.mkdirSync(base, { recursive: true });
    }

    // Set the destination
    cb(null, base);
  },
  filename: function (req, file, cb) {
    if (!file) return;

    // Generate a unique filename using the current timestamp and original name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}-${file.originalname}`;

    // Set the file path in the request body
    req.body.image = path.join(base, filename);

    // Save the file with the generated filename
    cb(null, filename);
  },
});

// Export the multer upload instance
exports.upload = multer({ storage: storage });
