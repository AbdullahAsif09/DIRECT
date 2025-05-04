const { user } = require("../modals");
const {
  emailVerification,
  sendForgotPasswordOtpEmail,
  emailVerified,
} = require("../common/nodemailer");
const path = require("path");
const { getToken } = require("../helper/jwtToken");
const { isValidId } = require("../helper/mongodbIdCheck");
const { default: mongoose } = require("mongoose");
const { createToken } = require("../common/createhashtoken");
const { setCookies } = require("../helper/cookie");
const { emailTemplates } = require("../constants");

/* create user */
exports.create = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const name = req.body?.name ?? " ";
    const email = req.body?.email;
    const phone = req.body?.phone;
    const password = req.body?.password;
    const confirmpassword = req.body?.confirmpassword;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        type: "incomplete",
        result: "Fill all the fields to proceed",
      });
    }

    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ type: "failure", result: "password mismatch error" });
    }

    const dataToSend = {
      account: {
        name: name,
        email: String(email).toLowerCase(),
        phone: phone,
        password: password,
        confirmpassword: confirmpassword,
      },
    };

    const oldUser = await user.findOne({
      "account.email": req.body.email.toLowerCase(),
    });
    if (oldUser) {
      return res.status(400).json({
        type: "failure",
        result: "User already Exist. Choose a Different email and phone number",
      });
    }
    const created_user = await user.create([dataToSend], { session });

    await emailVerification(created_user[0], res);
    session.commitTransaction();
    return res.status(201).json({
      type: "success",
      result: "signup successfull! verification email sent",
    });
  } catch (error) {
    // session.endSession();
    res.status(500).json({
      type: "failure",
      result: "Server not Responding. Try Again",
      details: error.message,
    });
  }
};
/* verify user */
exports.verifyuser = async (req, res) => {
  try {
    const { token, verificationToken } = req.query;
    /* check if Id is mongodb docuemnt id */
    if (!isValidId(token)) {
      return res.status(400).json({
        type: "failure",
        result: "Invalid Token",
      });
    }

    var foundUser = await user.findOne({
      _id: token,
    });
    if (foundUser) {
      const account = foundUser.account;
      if (!account.verification.verified) {
        /* check token */
        if (verificationToken !== foundUser.account.verification.token) {
          return res
            .status(403)
            .json({ type: "failure", result: "invalid token" });
        }
        foundUser.account.verification.verified = true;
        foundUser.account.verification.tokenUsed = true;
        await foundUser.save();

        await emailVerified(foundUser, res);

        return res.sendFile(emailTemplates.emailVerified);
      } else {
        return res.sendFile(emailTemplates.emailVerified);
      }
    } else {
      return res.status(400).json({
        type: "failure",
        result: "Invalid Token",
      });
    }
  } catch (error) {
    res.status(500).json({
      type: "failure",
      result: "Server not Responding. Try Again",
      details: error.message ?? error,
    });
  }
};

/* login */
exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        type: "failure",
        result: "Fill all the fields to proceed",
      });
    }
    var userToFind = await user
      .findOne({
        "account.email": req.body.email.toLowerCase(),
      })
      .populate("academia")
      .populate("industry")
      .select("-account.otp -account.temporaryOTP");
    if (!userToFind) {
      res.status(401).json({
        type: "failure",
        result: "No User Exists With Such Email or Phone",
      });
    } else {
      if (!userToFind.account.verification.verified) {
        return res
          .status(401)
          .json({ type: "failure", result: "Email is not verified" });
      }
      const isEqual = await user.comparePassword(
        req.body.password,
        userToFind.account.password
      );
      if (!isEqual) {
        return res.status(401).json({
          type: "failure",
          result: "Wrong Password",
        });
      }

      const token = getToken(userToFind, "users", req);

      setCookies(res, token);

      res.status(200).json({
        type: "success",
        result: "User Login Successfully",
        userDetails: {
          ...userToFind._doc,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* forgot password */
exports.forgotPassword = async (req, res) => {
  try {
    var userToFind = await user.findOne({
      "account.email": req.body.email.toLowerCase(),
    });
    if (userToFind) {
      await sendForgotPasswordOtpEmail(userToFind, res);
      res.status(200).json({
        type: "success",
        result: "An email has been sent!",
        otpSent: true,
      });
    } else {
      res.status(401).json({ type: "failure", result: "User Does not Exist" });
    }
  } catch (error) {
    console.log(error + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
/* verify forgotpassword otp */
exports.verifyforgotpasswordotp = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        type: "failure",
        result: "Insufficient data provided",
      });
    }
    if (!req.body.otp) {
      return res.status(400).json({
        type: "failure",
        result: "Otp is required",
      });
    }
    if (String(req.body.otp).trim().length < 4) {
      return res.status(400).json({
        type: "failure",
        result: "Invalid OTP",
      });
    }

    var userToFind = await user.findOne({
      "account.email": req.body.email.toLowerCase(),
    });
    if (!userToFind) {
      return res.status(400).json({
        type: "failure",
        result: "User Does not Exist",
      });
    }

    if (userToFind.account.otp.number == req.body.otp) {
      if (
        !userToFind.account.otp.expiry ||
        new Date(userToFind.account.otp.expiry) < Date.now()
      ) {
        return res.status(400).json({
          type: "failure",
          result: "OTP Expired",
        });
      }

      /* get token */
      const token = await createToken({
        _id: userToFind?._id,
        name: userToFind.account?.name,
        date: new Date(),
      });

      userToFind.account.otp = {
        token: {
          token,
          tokenUsed: false,
        },
        expiry: new Date(),
      };

      await userToFind.save();
      return res.status(200).json({
        type: "success",
        result: "OTP Verified",
        token,
      });
    } else {
      return res.status(400).json({
        type: "failure",
        result: "Invalid OTP/OTP Expired",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "failure",
      result: "Server not Responding. Try Again",
    });
  }
};
/* reset password with token verification */
exports.resetPassword = async (req, res) => {
  try {
    if (!req.body.token) {
      return res.status(403).json({
        type: "failure",
        result: "token is required",
      });
    }
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        type: "failure",
        result: "Fill all the fields to proceed",
      });
    }

    var userToFind = await user.findOne({
      "account.email": req.body.email.toLowerCase(),
    });
    if (!userToFind) {
      return res.status(400).json({
        type: "failure",
        result: "User Does not Exist",
      });
    }
    if (userToFind.account.otp.token.token != req.body.token) {
      return res.status(403).json({ type: "failure", result: "invalid token" });
    } else if (userToFind.account.otp.token.tokenUsed) {
      return res
        .status(403)
        .json({ type: "failure", result: "token is used already!" });
    }
    userToFind.account.password = req.body.password;
    userToFind.account.otp.token.tokenUsed = true;
    await userToFind.save();
    return res.status(200).json({
      type: "success",
      result: "Password has been changed",
    });
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.getmyprofile = async (req, res) => {
  try {
    if (!req.authId) {
      return res.status(403).json({
        type: "failure",
        result: "token is required",
      });
    }

    var userToFind = await user
      .findById(req.authId)
      .populate("academia")
      .populate("industry")

      .select(
        "-account.password -account.verification -account.otp -account.temporaryOTP"
      );
    if (!userToFind) {
      return res.status(400).json({
        type: "failure",
        result: "User Does not Exist",
      });
    }

    return res.status(200).json({
      type: "success",
      result: userToFind,
    });
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.getprofile = async (req, res) => {
  try {
    if (!req.authId) {
      return res.status(403).json({
        type: "failure",
        result: "token is required",
      });
    }
    if (!req.query.userId) {
      return res.status(403).json({
        type: "failure",
        result: "userId is required",
      });
    }

    var userToFind = await user
      .findById(req.query.userId)
      .select(
        "-account.password -account.verification -account.otp -account.temporaryOTP"
      )

      .populate("industry")
      .populate("academia");
    if (!userToFind) {
      return res.status(400).json({
        type: "failure",
        result: "User Does not Exist",
      });
    }

    return res.status(200).json({
      type: "success",
      result: userToFind,
    });
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const searchQuery = req.query?.search || "";
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 documents per page
    const skip = (page - 1) * limit;

    let query = {};
    if (searchQuery) {
      query["$or"] = [
        { "account.name": { $regex: new RegExp("^" + searchQuery, "i") } },
        { "account.email": { $regex: new RegExp("^" + searchQuery, "i") } },
      ];
    }

    const usersProjectReqSubmittor = await user.aggregate([
      { $match: query },
      { $project: { "account.name": 1, "account.email": 1, role: 1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $group: {
          _id: null,
          docs: { $push: "$$ROOT" },
        },
      },
      { $unwind: { path: "$docs", includeArrayIndex: "index" } },
      {
        $addFields: {
          "docs.id": { $add: ["$index", 1] },
        },
      },
      {
        $replaceRoot: { newRoot: "$docs" },
      },
    ]);

    if (usersProjectReqSubmittor.length < 1) {
      return res.status(401).json({
        type: "failure",
        result: "No User found",
      });
    }
    res.status(200).json({
      type: "success",
      result: usersProjectReqSubmittor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
