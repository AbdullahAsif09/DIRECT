const { allowedOrigins } = require("../../constants");

const checkOrigin = (originToCheck = "") => {
  return allowedOrigins.find((origin) => {
    if (origin == "*") return true;
    return originToCheck?.includes(origin);
  });
};
module.exports = {
  checkOrigin,
};
