const JWT = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_SECRET_KEY;

const expiresIn = "12h";

exports.getToken = (user, modal, req) => {
  const token = JWT.sign(
    {
      _id: user._id,
      modal /* this will be used for accessing models, and veerification like if user is admin, agency , academia or industry */,
      role: user
        .role[0] /* this will be used for role verification within admin */,
      userAgent: req.headers["user-agent"],
      clientIp: req.clientIp,
      date: new Date(),
    },
    JWT_KEY,
    { expiresIn }
  );
  return token;
};
exports.getSubToken = (data) => {
  const token = JWT.sign(data, JWT_KEY);
  return token;
};
exports.getTokenWithData = (data) => {
  const token = JWT.sign(data, JWT_KEY, { expiresIn });
  return token;
};
