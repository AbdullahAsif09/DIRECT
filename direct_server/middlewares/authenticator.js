const jwt = require("jsonwebtoken");
const { setCookies } = require("../helper/cookie");

exports.checkIfAuthenticated = async (req, res, next) => {
  try {
    const authToken = req.cookies?.token;
    if (!authToken) {
      return res.json({
        type: "failure",
        result: "No token provided. Please log in again.",
      });
    }
    const decode = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    const subToken = req.cookies?.subToken;
    if (subToken) {
      req.subProfile = jwt.verify(subToken, process.env.JWT_SECRET_KEY);
    }
    req.authId = decode.userId || decode._id;

    req.decodedToken = decode;
    if (decode) {
      return next();
    } else {
      setCookies(res, null);
      return res.json({
        type: "failure",
        result: "Token is invalid. Please log in again.",
      });
    }
  } catch (e) {
    const message = e.message === "jwt expired" ? "Token expired" : e.message;
    return res.status(401).send({ error: "Not authorized", message: message });
  }
};

/* for logout */
exports.checkIfUserHadToken = (req, res, next) => {
  const authToken = req.cookies?.token;
  try {
    if (!authToken) {
      setCookies(res, null);
      return res.json({
        type: "success",
        result: true,
      });
    }
    const decode = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    req.authId = decode._id;
    req.decodedToken = decode;

    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      const decode = jwt.decode(authToken);

      req.authId = decode._id;
      req.decodedToken = decode;

      next();
    } else {
      return res
        .status(401)
        .send({ error: "Not authorized", message: e.message });
    }
  }
};
