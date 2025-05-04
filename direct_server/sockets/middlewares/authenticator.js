const jwt = require("jsonwebtoken");
const { rolesToCollectionMapper } = require("../../constants");

const JWT_KEY = process.env.JWT_SECRET_KEY;

exports.checkIfAuthenticated = (socket, next) => {
  try {
    let token;
    let subToken;

    // Extract token and subToken from cookies
    const cookies = socket.request.headers.cookie ?? "";
    cookies.split(";").forEach((cookie) => {
      const [key, value] = cookie.split("=");
      if (key.trim() === "token") token = value;
      if (key.trim() === "subToken") subToken = value;
    });

    if (!token) {
      socket.disconnect();
      return console.error("Authentication token missing");
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_KEY);
    if (subToken) {
      socket.sub = jwt.verify(subToken, JWT_KEY);
    }

    // Assign authenticated details
    socket.authId = decoded._id ?? decoded.userId;
    socket.role = rolesToCollectionMapper[decoded.modal ?? decoded.role];

    // Proceed with next middleware or handler

    next();
  } catch (e) {
    // Extract token and subToken from cookies

    console.error("Authentication error at socket middleware:", e.message);
    socket.disconnect(); // Disconnect socket if authentication fails
  }
};
