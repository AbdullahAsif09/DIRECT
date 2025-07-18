const multer = require("multer");
const fs = require("fs");

const destination = "asset/user";
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    if (file) {
      const extension = file.mimetype;
      var filename = Date.now() + "-" + file.originalname;
      req.body.image = destination + "/" + filename;
      cb(null, filename);
    }
  },
});

exports.upload = multer({ storage: storage });
