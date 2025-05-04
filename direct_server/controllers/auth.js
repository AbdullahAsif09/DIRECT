const Crypto = require("crypto-js");
const { models } = require("../constants");
const { throwError } = require("../helper/throwError");
const { getSubToken, getTokenWithData } = require("../helper/jwtToken");
const { setCookies } = require("../helper/cookie");
const { encryption } = require("../helper/AES");
const { getUserRoleAndId } = require("../helper/getUserRoleAndId");

const validator = async (req, res, next) => {
  const encryptedData = req.body.data;

  if (!encryptedData) {
    throwError("Unauthorized access: No Data", 403);
  }

  const bytes = Crypto.AES.decrypt(
    encryptedData,
    req.authId + process.env.VITE_CRYPTO_SECRET_CLIENT_KEY
  );
  const decryptedMessage = bytes.toString(Crypto.enc.Utf8);
  const parsedData = JSON.parse(decryptedMessage);

  if (!parsedData?.userId || !parsedData?.role || !parsedData?.date) {
    throwError(`Unauthorized access: Incomplete Data`, 403);
  }

  // Ensure the request is not older than 20000 milliseconds (20 second)
  const requestTime = new Date(parsedData.date).getTime();
  const currentTime = Date.now();

  if (currentTime - requestTime > 50000) {
    throwError(
      `Please ensure your device's date and time settings are correct.`,
      403
    );
  }

  // Check if user ID matches the authenticated user ID
  if (parsedData.userId !== req.authId) {
    throwError("Unauthorized access : authId mismatch", 403);
  }

  if (!models[parsedData.role]) {
    throwError("Invalid role", 400);
  }

  if (parsedData.role !== parsedData.role) {
    throwError("Unauthorized access: Invalid Role", 400);
  }
  if (parsedData.clientIp != parsedData.clientIp) {
    throwError("Unauthorized access: Invalid IP", 400);
  }
  if (parsedData.userAgent !== req.headers["user-agent"]) {
    // throwError("Unauthorized access: Invalid User Agent", 400);
  }

  let user;
  if (!parsedData?.subProfile) {
    user = await models[parsedData.role].findById(parsedData.userId).lean();
  } else {
    user = await models[parsedData.subProfile.role]
      .findById(parsedData.subProfile.userId)
      .lean();
  }

  if (!user) {
    throwError("Unauthorized access: No User", 403);
  }

  return {
    user,
    parsedData,
  };
};

exports.validateRole = async (req, res, next) => {
  try {
    const { user, parsedData } = await validator(req, res, next);

    if (user) {
      if (user.account) {
        delete user.account.password;
        delete user.account.token;
        delete user.account.temporaryOTP;
        delete user.account.otp;
        delete user.account.verification.token;
      } else {
        delete user.password;
        delete user.token;
        delete user.temporaryOTP;
        delete user.otp;
      }

      if (!parsedData.subProfile) {
        // res.clearCookie("subToken");
      } else {
        const token = await getSubToken(parsedData.subProfile);
        setCookies(res, token, "subToken");
      }

      const data = encryption(user, req.authId);
      return res.json({
        type: "success",
        result: true,
        protected: data,
      });
    }
  } catch (error) {
    const code = error.code || 500;
    const message = error.message || "Internal Server Error";
    res.status(code).json({ type: "failure", result: message });
  }
};
exports.refreshCookie = async (req, res, next) => {
  try {
    await validator(req, res, next);

    const bytes = Crypto.AES.decrypt(
      req.body.data,
      req.authId + process.env.VITE_CRYPTO_SECRET_CLIENT_KEY
    );
    const decryptedMessage = bytes.toString(Crypto.enc.Utf8);
    decryptedMessage["date"] = new Date();
    decryptedMessage["clientIp"] = req.clientIp;

    delete decryptedMessage.iat;
    delete decryptedMessage.exp;

    const token = await getTokenWithData(JSON.parse(decryptedMessage));

    setCookies(res, token);
    return res.json({
      type: "success",
      result: true,
    });
  } catch (error) {
    const code = error.code || 500;
    const message = error.message || "Internal Server Error";
    return res.status(code).json({ type: "failure", result: message });
  }
};
exports.logout = async (req, res) => {
  try {
    if (!req.authId) {
      setCookies(res, null);
      return res.json({
        type: "success",
        result: true,
      });
    }
    setCookies(res, null);
    res.clearCookie("subToken");
    return res.json({
      type: "success",
      result: true,
    });
  } catch (error) {
    const code = error.code || 500;
    const message = error.message || "Internal Server Error";
    res.status(code).json({ type: "failure", result: message });
  }
};

exports.getprofile = async (req, res) => {
  try {
    const { userId, model, rootUserId } = getUserRoleAndId(req);
    let user;
    const delselct =
      "-password -account.password -otp -account.temporaryOTP -account.verification.token -verification.token -temporaryOTP -account.otp";
    const newModelName = String(model);

    const isUser =
      newModelName.startsWith("user") ||
      newModelName.startsWith("industry") ||
      newModelName.startsWith("academia");
    if (isUser) {
      user = await models.user
        .findById(rootUserId)
        .select(delselct)
        .populate("industry")
        .populate("academia");
    } else {
      user = await models[model].findById(userId).select(delselct);
    }
    return res.status(200).json(user);
  } catch (error) {
    const code = error.code || 500;
    const message = error.message || "Internal Server Error";
    return res.status(code).json({ type: "failure", result: message });
  }
};
