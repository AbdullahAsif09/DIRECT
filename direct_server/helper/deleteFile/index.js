const fs = require("fs");

exports.deleteFile = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
    console.log("File deleted successfully: " + path);

    return true;
  } else {
    return false;
  }
};
