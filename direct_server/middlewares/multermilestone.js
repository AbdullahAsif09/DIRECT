const multer = require("multer");
const path = require("path");
const fs = require("fs");

let directory = "uploads/milestones";

const storege = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!file) return;

    const toSave = path.join(__dirname, `../${directory}`);
    if (!fs.existsSync(toSave)) {
      fs.mkdirSync(toSave, { recursive: true });
    }

    cb(null, directory);
  },
  filename: function (req, file, cb) {
    if (file) {
      const filename = new Date().getTime() + file.originalname;

      if (!req?.uploadedFilesArray) {
        req.uploadedFilesArray = [];
      }
      req.uploadedFilesArray.push({
        url: directory + "/" + filename,
        name: file.originalname,
        date: new Date(),
      });
      cb(null, filename);
    }
  },
});
exports.milestonemulter = multer({ storage: storege });
