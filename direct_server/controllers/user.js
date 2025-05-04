const { user: USER } = require("../modals");
const USR = require("../modals/USR");
const Projects = require("../modals/projects");
const Proposal = require("../modals/proposal");
const { SendEmail, sendOTP } = require("../common/email");
const path = require("path");
const { getToken } = require("../helper/jwtToken");
const { uploadDiskStorage } = require("../middlewares/multer");
const { isValidId } = require("../helper/mongodbIdCheck");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

class UserController {
  /* create user */
  create = async (req, res) => {
    try {
      const name = req.body?.firstName + " " + req.body?.lastName;
      const email = req.body?.email;
      const phone = req.body?.phone;
      const password = req.body?.password;
      console.log(req.body, "body");
      const dataToSend = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        confirmpassword: req.body?.confirmpassword,
        type: req.body?.type,
      };
      if (!name || !email || !phone || !password) {
        return res.status(400).json({
          type: "incomplete",
          result: "Fill all the fields to proceed",
        });
      }
      const oldUser = await USER.findOne({
        $or: [
          { email: req.body?.email.toLowerCase() },
          { phone: req.body?.phone },
        ],
      });
      if (oldUser) {
        return res.status(400).json({
          type: "emailExist",
          result:
            "User already Exist. Choose a Different email and phone number",
        });
      }
      const user = await USER.create(dataToSend);
      user.password = await USER.CreateHash(user.password);
      user.email = req.body.email.toLowerCase();
      /* email, name, user, res, modaltype */
      await SendEmail(email, name, user, res, "user");
    } catch (error) {
      console.log(error);
      res.status(500).json({
        type: "failure",
        result: "Server not Responding. Try Again",
      });
    }
  };
  /* verify user */
  verifyuser = async (req, res) => {
    try {
      const Id = req.query.token;
      /* check if Id is mongodb docuemnt id */
      if (!isValidId(Id)) {
        return res.status(400).json({
          type: "failure",
          result: "Invalid Token",
        });
      }

      var user = await USER.findById(Id);
      if (user) {
        if (!user.verify) {
          user.verify = true;
          await user.save();
        }
        return res.sendFile(
          path.join(__dirname + "../../templates/emailverified.html")
        );
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
      });
    }
  };

  /* login */
  login = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({
          type: "failure",
          result: "Fill all the fields to proceed",
        });
      }
      var user = await USER.findOne({
        $or: [
          { email: req.body.email.toLowerCase() },
          { phone: req.body.email },
        ],
      });
      if (!user) {
        res.status(401).json({
          type: "failure",
          result: "No User Exists With Such Email or Phone",
        });
      } else {
        if (user.verify === false) {
          return res
            .status(401)
            .json({ type: "failureEmail", result: "Email is not verified" });
        }
        const isEqual = await USER.isPasswordEqual(
          req.body.password,
          user.password
        );
        if (!isEqual) {
          return res.status(401).json({
            type: "failure",
            result: "Wrong Password",
          });
        }

        const token = getToken(user, "user", req);

        res.status(200).json({
          type: "success",
          result: "User Login Successfully",
          token: token,
          userDetails: {
            ...user._doc,
          },
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ type: "failure", result: "Server Not Responding" });
    }
  };
  /* forgot password */
  otpsend = async (req, res) => {
    try {
      const user = await USER.findOne({ email: req.body.email.toLowerCase() });
      if (user) {
        await sendOTP(user.email, user.name, user, res);
      } else {
        res
          .status(401)
          .json({ type: "failure", result: "User Does not Exist" });
      }
    } catch (error) {
      console.log(error + "error");
      res
        .status(500)
        .json({ type: "failure", result: "Server Not Responding" });
    }
  };
  /* verify otp */
  verifyotp = async (req, res) => {
    try {
      if (!req.body.email || !req.body.otp) {
        return res.status(400).json({
          type: "failure",
          result: "Fill all the fields to proceed",
        });
      }
      const user = await USER.findOne({ email: req.body.email.toLowerCase() });
      if (!user) {
        return res.status(400).json({
          type: "failure",
          result: "User Does not Exist",
        });
      }
      if (user.otp === req.body.otp) {
        if (new Date(user.expireTime) < Date.now()) {
          return res.status(400).json({
            type: "failure",
            result: "OTP Expired",
          });
        }
        return res.status(200).json({
          type: "success",
          result: "OTP Verified",
        });
      } else {
        return res.status(400).json({
          type: "failure",
          result: "Invalid OTP",
        });
      }
    } catch (error) {
      res.status(500).json({
        type: "failure",
        result: "Server not Responding. Try Again",
      });
    }
  };
  /* reset password with token verification */
  resetPassword = async (req, res) => {
    try {
      console.log(req.body);
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({
          type: "failure",
          result: "Fill all the fields to proceed",
        });
      }
      const user = await USER.findOne({ email: req.body.email.toLowerCase() });
      if (!user) {
        return res.status(400).json({
          type: "failure",
          result: "User Does not Exist",
        });
      }
      user.password = await USER.CreateHash(req.body.password);
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
      res
        .status(500)
        .json({ type: "failure", result: "Server Not Responding" });
    }
  };
  /* submit document */
  uploadusr = async (req, res) => {
    console.log("inside request", req.authId);
    try {
      if (!req.authId) {
        return res
          .status(401)
          .json({ type: "failure", result: "Not Authorized" });
      }
      uploadDiskStorage(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res
            .status(400)
            .json({ message: "Multer error occurred", error: err });
        } else if (err) {
          return res
            .status(500)
            .json({ message: "Unknown error occurred", error: err });
        }
        const files = req.uploadedFiles;

        await USR.create({ user: req.authId, files: files });
        const usrs = await USR.aggregate([
          { $match: { user: mongoose.Types.ObjectId(req.authId) } }, // Ensure req.authId is an ObjectId
          { $unwind: "$files" },
          {
            $project: {
              _id: 1,
              file: "$files",
              createdAt: 1,
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  "$file",
                  { createdAt: "$createdAt", _id: "$_id" },
                ],
              },
            },
          },
          { $sort: { createdAt: -1 } },
        ]);
        res.status(200).json({
          type: "success",
          result: "Document Uploaded Successfully",
          data: usrs,
        });
      });
    } catch (e) {
      return res.json({ type: "failure", result: "Server Not Responding" });
    }
  };
  getfiles = async (req, res) => {
    console.log(req.authId, "authId");
    try {
      const usr = await USR.aggregate([
        { $match: { user: mongoose.Types.ObjectId(req.authId) } }, // Ensure req.authId is an ObjectId
        { $unwind: "$files" },
        {
          $project: {
            _id: 1,
            file: "$files",
            createdAt: 1,
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                "$file",
                { createdAt: "$createdAt", _id: "$_id" },
              ],
            },
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      return res.status(200).json({
        type: "success",
        result: "Document Fetched Successfully",
        data: usr,
      });
    } catch (e) {
      console.log(e);
      return res.json({ type: "failure", result: "Server Not Responding" });
    }
  };

  /* get user projects */
  getProjects = async (req, res) => {
    const id = req.authId;
    try {
      const projectInfo = await Projects.find(
        { usrBy: { $in: [id] } },
        {
          title: 1,
          createdAt: 1,
          published: 1,
          proposalsAmount: 1,
          image: 1,
        }
      );
      if (!projectInfo) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json({ message: "success", data: projectInfo });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Project not found || internal error" });
    }
  };
  /* getProject */
  getProject = async (req, res) => {
    const id = req.query.id;
    console.log(req.query, req.params);
    try {
      const projectInfo = await Projects.findById(id);
      if (!projectInfo) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json({ message: "success", data: projectInfo });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Project not found || internal error" });
    }
  };
  /* get Project Proposals */
  getProjectProposals = async (req, res) => {
    try {
      const id = req.query.id;
      const proposals = await Proposal.find(
        { usrBy: req.authId, projectID: id },
        {}
      )
        .populate({
          path: "submittedBy.id",
          select: "firstName lastName",
        })
        .populate({
          path: "projectID",
          select: "ongoing title",
        });
      if (!proposals) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      return res.status(200).json({ message: "success", data: proposals });
    } catch (e) {
      console.log(e.message);
      return res.json({ type: "failure", result: "Server Not Responding" });
    }
  };
  getProposalsForAgency = async (req, res) => {
    try {
      const { projectID } = req.body;
      if (!projectID) {
        return res.status(400).json({
          type: "failure",
          result: "ID is required",
        });
      }
      const proposalReq = await Proposal.find(
        {
          projectID: projectID,
          sendToAgency: true,
        },
        {
          testing: 0,
          assignedTo: 0,
          sendToAgency: 0,
          proposalText: 0,
          financialProposal: 0,
        }
      ).populate("submittedBy.id", "name");
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
  uploadAwardedDocument = async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  uploadContractedDocument = async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserController;
