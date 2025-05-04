const path = require("path");
const User = require("../../modals/admin/admin");
const { user: UsersProjectReqSubmittor } = require("../../modals");

const proposalModel = require("../../modals/proposal");
const { sendOTP } = require("../../common/email");
const USR = require("../../modals/USR");
const projectsModel = require("../../modals/projects");
const { getToken } = require("../../helper/jwtToken");
const {
  adminVerification,
  emailVerification,
} = require("../../common/nodemailer");
const { setCookies } = require("../../helper/cookie");
const { emailTemplates } = require("../../constants");

exports.signUP = async (req, res) => {
  try {
    const user = new User(req.body);
    user.email = req.body.email.toLowerCase();

    user.password = await User.CreateHash(user.password);
    const oldUser = await User.findOne({
      $or: [{ email: user.email.toLowerCase() }, { phone: user.phone }],
    });
    if (oldUser) {
      res.status(400).json({
        type: "emailExist",
        result: "User already Exist. Choose a Different email and phone number",
      });
      return;
    }

    await emailVerification(user.email, user.firstName, user, res);
    return res.status(200).json({
      type: "success",
      result:
        "An email has been sent to your registered email address. Please verify it to complete the registration process.",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};

exports.Verify = async (req, res) => {
  try {
    const Id = req.query.token;

    var user = await User.findOne({ _id: Id });

    user.verify = true;
    user
      .save()
      .then(() => {
        res.sendFile(emailTemplates.emailVerified);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ type: "failure", result: "Server Not Responding" });
        return;
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ type: "failure", result: "Server not Responding. Try Again" });
  }
};

exports.signIn = async (req, res) => {
  try {
    console.log(req.body);

    var user = await User.findOne({
      $or: [{ email: req.body.email.toLowerCase() }, { phone: req.body.email }],
    });

    if (!user) {
      res.status(401).json({
        type: "failure",
        result: "Invalid Credentials",
      });
    } else {
      const isEqual = await User.isPasswordEqual(
        req.body.password,
        user.password
      );

      if (isEqual) {
        await adminVerification(user, res);
        return res
          .status(200)
          .json({ type: "success", result: "Otp sent Successfully" });
      } else {
        res.status(401).json({ type: "failure", result: "Wrong Password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.OTP = async (req, res) => {
  console.log("object" + req.body.email);
  try {
    var user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      sendOTP(user.email, user.firstname, user, res);
    } else {
      res.status(401).json({ type: "failure", result: "Email Does not Exist" });
    }
  } catch (error) {
    console.log(error + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    var otp = req.body.number;
    const data = await User.findOne({ email: req.body.email.toLowerCase() });

    const now = new Date();
    if (now > new Date(data.expireTime)) {
      res.status(401).json({ type: "failure", result: "OTP has been expired" });
    } else {
      if (otp === data.otp) {
        res
          .status(200)
          .json({ type: "success", result: "OTP has been verified" });
      } else {
        res.status(401).json({ type: "failure", result: "OTP is incorrect" });
      }
    }
  } catch (error) {
    console.log(error + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.verifyTempOTP = async (req, res) => {
  try {
    const isDev = req.body.isDev;
    var data = await User.findOne({ email: req.body.email.toLowerCase() });
    if (isDev) {
      const isEqual = await User.isPasswordEqual(
        req.body.password,
        data.password
      );

      if (!isEqual) {
        return res.json("invalid credentials");
      }
      const token = getToken(data, "admin", req);

      setCookies(res, token);

      return res.status(200).json({
        type: "success",
        result: "Admin Login Successfully",
        userDetails: {
          ...data._doc,
        },
      });
    }
    var otp = req.body.number;

    const now = new Date();
    const temporarycodeOTP = data?.temporarycodeOTP;
    if (now > new Date(temporarycodeOTP.expireTime)) {
      res.status(401).json({ type: "failure", result: "OTP has been expired" });
    } else {
      if (otp === temporarycodeOTP.code) {
        const token = getToken(data, "admin", req);

        setCookies(res, token);

        res.status(200).json({
          type: "success",
          result: "Admin Login Successfully",
          userDetails: {
            ...data._doc,
          },
        });
      } else {
        res.status(401).json({ type: "failure", result: "OTP is incorrect" });
      }
    }
  } catch (error) {
    console.log(error + "error");
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    console.log("OTP" + req.body.email + req.body.password);

    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    user.password = await User.CreateHash(req.body.password);
    user
      .save()
      .then(() => {
        res.status(200).json({
          type: "success",
          result: "Password has been changed",
        });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ type: "failure", result: "Server Not Responding" });
        return;
      });
  } catch (error) {
    res.status(500).json({ type: "failure", result: "Server Not Responding" });
  }
};
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.aggregate([
      {
        $match: { verify: true },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          firstName: 1,
          phone: 1,
          lastName: 1,
          type: 1,
          createdAt: 1,
          Role: 1,
          role: 1,
        },
      },
      {
        $sort: { _id: 1 }, // Ensure a consistent order if necessary
      },
      {
        $group: {
          _id: null,
          docs: { $push: "$$ROOT" },
        },
      },
      {
        $unwind: { path: "$docs", includeArrayIndex: "index" },
      },
      {
        $addFields: {
          "docs.id": { $add: ["$index", 1] },
        },
      },
      {
        $replaceRoot: { newRoot: "$docs" },
      },
    ]);

    if (!admins) {
      res.status(404).json({
        type: "failure",
        result: "No Admin Found",
      });
    }
    res.status(200).json({
      type: "success",
      result: admins,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const admins = await User.find(
      { verify: true },
      {
        _id: 1,
        email: 1,
        firstName: 1,
        phone: 1,
        lastName: 1,
        type: 1,
        createdAt: 1,
        role: 1,
        type: 1,
      }
    );
    if (!admins) {
      res.status(404).json({
        type: "failure",
        result: "No Admin Found",
      });
    }
    res.status(200).json({
      type: "success",
      result: admins,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getAllUserProjectSubmittors = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 documents per page
    const skip = (page - 1) * limit;

    var usersProjectReqSubmittor = await UsersProjectReqSubmittor.find(
      {
        name: {
          $regex: new RegExp("^" + searchQuery, "i"), // 'for search query
        },
        verify: true,
      },
      {
        _id: 1,
        email: 1,
        name: 1,
        phone: 1,
        type: 1,
      }
    )
      .skip(skip)
      .limit(limit);

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
/* getUSRS */
exports.getUSRS = async (req, res) => {
  try {
    const usr = await USR.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$files",
      },
      {
        $project: {
          _id: 1,
          files: 1,
          createdAt: 1,
          user: {
            _id: { $arrayElemAt: ["$userDetails._id", 0] }, // Get user _id
            name: { $arrayElemAt: ["$userDetails.account.name", 0] }, // Get user name
            email: { $arrayElemAt: ["$userDetails.account.email", 0] }, // Get user name
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$files",
              { createdAt: "$createdAt", _id: "$_id", user: "$user" },
            ],
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return res.status(200).json({
      type: "success",
      result: usr,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      type: "failure",
      result: "Server Not Responding",
    });
  }
};

exports.getAllFeedbackOfProject = async (req, res) => {
  try {
    const { proposalId } = req.body;
    if (!proposalId) {
      return res.status(400).json({
        type: "failure",
        result: "Proposal ID is required",
      });
    }
    const proposalReq = await proposalModel
      .findById(proposalId, {
        assignedTo: 1,
        reviewByReviewer: 1,
      })
      .populate("assignedTo.reviewerID.id", "firstName lastName name");

    if (!proposalReq) {
      return res.status(404).json({
        type: "failure",
        result: "No Feedback found",
      });
    }
    res.status(200).json({
      type: "success",
      result: proposalReq,
    });
  } catch (error) {
    console.log(error);
  }
};

// get milestones of a project
exports.getProjectMilestones = async (req, res) => {
  try {
    const { projectID } = req.body;
    // Step 1: Fetch the project with proposals
    const project = await projectsModel.findById(projectID, {
      finalProposalsChosenByAgency: 1,
    });

    // Check if project exists
    if (!project) {
      return res.status(400).json({
        type: "failure",
        result: "no project found",
      });
    }

    // Step 2: Manually populate each proposal
    let reqData = [];
    for (let proposalId of project.finalProposalsChosenByAgency) {
      const proposal = await proposalModel
        .findById(proposalId, {
          proposalText: 0,
          testing: 0,
          financialProposal: 0,
        })
        .populate("submittedBy.id", "name")
        .populate("milestones", "startDate endDate"); // Fetch each proposal
      reqData.push(proposal);
    }
    return res.status(200).json({ message: "success", result: reqData });
  } catch (error) {
    console.log(error);
  }
};

exports.completeProject = async (req, res) => {
  try {
    const { projectID } = req.body;
    console.log(projectID, "projectID");
    const project = await projectsModel.findByIdAndUpdate(projectID, {
      completed: true,
    });
    if (!project) {
      return res
        .status(404)
        .json({ message: "error", result: "no projects found" });
    }
    return res.status(200).json({ message: "success", result: project });
  } catch (error) {
    console.log(error);
  }
};

exports.reqChangesInProposal = async (req, res) => {
  const { remarks, proposalID } = req.body;
  console.log(proposalID);
  console.log(remarks);
  try {
    const proposal = await proposalModel.findByIdAndUpdate(proposalID, {
      resendToSubmittor: true,
      reqChangesRemarks: remarks,
    });
    if (!proposal) {
      return res
        .status(404)
        .json({ message: "error", result: "no proposal found" });
    }
    return res.status(200).json({
      message: "success",
      result: "Proposal has been send for Resubmission ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", result: "internal error" });
  }
};
exports.getProposalsForIndustryAcademia = async (req, res) => {
  const { userID } = req.body;
  console.log(userID);
  try {
    const proposal = await proposalModel
      .find(
        {
          "submittedBy.id": userID,
        },
        {
          projectID: 1,
          reqChangesRemarks: 1,
          resendToSubmittor: 1,
          awardedDocs: 1,
          awardedDocs: 1,
          contractedDocs: 1,
        }
      )
      .populate("projectID", "title");
    if (!proposal?.length < 0) {
      return res
        .status(404)
        .json({ message: "error", result: "no proposal found" });
    }
    return res.status(200).json({
      message: "success",
      result: proposal,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", result: "internal error" });
  }
};
