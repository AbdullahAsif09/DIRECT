exports.getClientIp = (req) => {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (xForwardedFor) {
    req.clientIp = xForwardedFor.split(",")[0];
  } else req.clientIp = req.ip;
};
