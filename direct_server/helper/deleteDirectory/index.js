const fs = require("fs");
const path = require("path");

exports.deleteDirectory = async (directoryPath) => {
  if (fs.existsSync(directoryPath)) {
    directoryPath = path.join(__dirname, `../../${directoryPath}`);

    fs.rmSync(directoryPath, { recursive: true, force: true });
    console.log(
      "Directory and its contents deleted successfully: " + directoryPath
    );

    return true;
  } else {
    console.log("Directory does not exist: " + directoryPath);
    return false;
  }
};
