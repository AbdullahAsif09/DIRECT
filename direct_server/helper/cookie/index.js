module.exports.setCookies = (res, token, cookieName = "token") => {
  if (!token || token == null) {
    // Clear the cookie if no token is provided
    res.clearCookie(cookieName, {
      httpOnly: cookieName === "token",
      secure: false,
      // secure: process.env.NODE_ENV === "production" /* use with SSL (HTTPS) */,
      sameSite: "Strict", // Adjust based on your needs
    });
  } else {
    // Set the cookie with the provided token
    res.cookie(cookieName, token, {
      httpOnly: cookieName === "token", // Accessible only by web server
      secure: false,
      // secure: process.env.NODE_ENV === "production" /* use with SSL (HTTPS) */,
      sameSite: "Strict", // Adjust based on your needs
      expires: new Date("2030-01-19T03:14:07Z"), // Expiration date set to 2030
    });
  }
};
