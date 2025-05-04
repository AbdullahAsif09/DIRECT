const bcrypt = require("bcryptjs");

const createToken = async (obj) => {
  return await bcrypt.hash(JSON.stringify({ ...obj }), 13);
};

exports.createToken = createToken;
