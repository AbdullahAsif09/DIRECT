module.exports.throwError = function (message = " ", code) {
  const error = new Error(message);
  error.code = code;
  throw error;
};
