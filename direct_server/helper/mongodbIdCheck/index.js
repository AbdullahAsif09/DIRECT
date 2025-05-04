const { default: mongoose } = require("mongoose");

exports.isValidId = (Id) => {
  /* check if mongoose id */

  if (!mongoose.isValidObjectId(Id)) {
    return false;
  }
  return true;
};
