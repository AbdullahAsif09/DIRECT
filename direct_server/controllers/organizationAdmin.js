const organizationAdmin = require("../modals/organizationAdmin");
const Organizations = require("../modals/organizations");
const Executive = require("../modals/executive");
const departments = require("../modals/departments");
const { adminVerification } = require("../common/nodemailer");
const { throwError } = require("../helper/throwError");
const bcryptjs = require("bcryptjs");
const { emailTemplates } = require("../constants");
const { deleteFile } = require("../helper/deleteFile");
const { deleteDocument } = require("../helper/deleteDocument");
const { getUserRoleAndId } = require("../helper/getUserRoleAndId");
const { accessRoles } = require("../constants/roles");
const projects = require("../modals/projects");
const mongoose = require("mongoose");
const { getToken } = require("../helper/jwtToken");
const { setCookies } = require("../helper/cookie");
/* create organization admin */
exports.createOrganizerAdmin = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { name, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !password || !email || !phone) {
      throwError("Missing required fields", 400);
    }

    const findOrganization = await Organizations.findOne({
      _id: req.body.organization,
    });

    if (!findOrganization) {
      throwError("Organization Not Found!", 400);
    }

    delete req.body.role;
    delete req.body.verification;
    delete req.body.temporarycodeOTP;

    // Create a new organization
    var newOrganization = await organizationAdmin.create(req.body);

    await Organizations.findByIdAndUpdate(req.body.organization, {
      admin: newOrganization._id,
    });

    res.status(201).json({
      type: "success",
      result: "Organization Admin Added successfully",
      organizationAdmin: newOrganization,
    });
  } catch (error) {
    deleteDocument(newOrganization, organizationAdmin);
    deleteFile(req.body.image);

    res.status(error.code || 500).json({
      type: "failure",
      result: error.message || "Server Not Responding",
    });
  }
};
/* create organization admin */

/* get projects for organization admin */
exports.getProjects = async (req, res, next) => {
  try {
    delete req.body.role;
    delete req.body.verification;
    delete req.body.temporarycodeOTP;

    const organizationID = req?.query?.id;

    // Create a new organization
    const organizationProjects = await projects.find({
      organization: organizationID,
    });

    res.status(200).json({
      type: "success",
      result: "Organization Projects",
      organizationAdmin: organizationProjects,
    });
  } catch (error) {
    res.status(error.code || 500).json({
      type: "failure",
      result: error.message || "Server Not Responding",
    });
  }
};

/* get Admins of organization */
exports.getAdmins = async (req, res, next) => {
  try {
    if (!req.query.id)
      return res.status(400).json({
        type: "failure",
        result: "Organization ID is required",
      });
    const admins = await Promise.all([
      organizationAdmin
        .findOne({ organization: req.query.id })
        .select(" -verification -verify -profileComplete -otp -temporarycodeOTP"),

      Executive.findOne({ organization: req.query.id }).select(
        "-verification -verify -profileComplete -otp -temporarycodeOTP"
      ),
    ]);
    return res.json({
      type: "success",
      result: {
        organizationAdmin: admins[0],
        executive: admins[1],
      },
    });
  } catch (error) {
    res.status(error.code || 500).json({
      type: "failure",
      result: error.message || "Server Not Responding",
    });
  }
};

/* get departments for organization admin */
exports.getDepartments = async (req, res, next) => {
  try {
    const organizationID = req.query?.id;

    const organizationDepartments = await departments
      .find({
        organizationID,
      })
      .populate({
        path: "creator.id",
        select: "name _id firstName lastName",
      });

    res.status(200).json({
      type: "success",
      result: "Organization Projects",
      organizationDepartments: organizationDepartments,
    });
  } catch (error) {
    res.status(error.code || 500).json({
      type: "failure",
      result: error.message || "Server Not Responding",
    });
  }
};

/* edit organization admin */
exports.edit = async (req, res, next) => {
  try {
    const body = req.body;

    const { userId, role } = getUserRoleAndId(req);
    let organizationAdminId = userId;

    /* if requested user role is super (webadmin) then take userId from params, otherwise organizationId will be extracted from user cookie */
    if (role == accessRoles.admins.super) {
      if (!req.params.id) throwError("Invalid organization admin id", 400);
      organizationAdminId = req.params.id;
    }

    if (!body.name && !body.image && !body.password && !body.phone) {
      throwError("Missing required fields", 400);
    }

    delete req.body.role;
    delete req.body.email;
    delete req.body.verification;
    delete req.body.temporarycodeOTP;

    const updateOrganization = await organizationAdmin.findByIdAndUpdate(organizationAdminId, req.body, { new: true });

    res.status(200).json({
      type: "success",
      result: "Organization created",
      organizationAdmin: updateOrganization,
    });
  } catch (error) {
    deleteFile(req.body.image);

    res.status(error.code ?? 500).json({
      type: "failure",
      result: error?.message ?? "Server Not Responding",
    });
  }
};

/* verify org admin signup */
exports.verify = async (req, res) => {
  try {
    const query = req.query;
    const Id = query.token;
    const verificationToken = query.verificationToken;

    if (!Id || !verificationToken) {
      throwError("Invalid Token", 400);
    }

    const user = await organizationAdmin.findById(Id);
    if (!user) {
      throwError("User not found", 404);
    }

    if (user.verification.verified) {
      throwError("Email already verified", 400);
    }

    if (user.verification.token != verificationToken) {
      throwError("Invalid Token", 400);
    }

    const verified = await bcryptjs.compare(
      JSON.stringify({
        _id: user?._id,
        name: user?.name,
      }),
      verificationToken
    );

    if (!verified) {
      throwError("Invalid verification link", 400);
    }

    user.verification.tokenUsed = true;
    user.verification.verifiedAt = new Date();

    user
      .save()
      .then(() => {
        res.sendFile(emailTemplates.emailVerified);
      })
      .catch((error) => {
        return throwError(error?.message ?? "Failed to verify email", 500);
      });
  } catch (error) {
    console.log(error.message);
    res.status(error.code ?? 500).json({
      type: "failure",
      result: error?.message ?? "Server Not Responding",
    });
  }
};

/* login organization admin */
exports.login = async (req, res) => {
  try {
    var user = await organizationAdmin.findOne({
      $or: [{ email: req.body.email.toLowerCase() }, { phone: req.body.email }],
    });

    if (!user) {
      throwError("Invalid Credentials", 404);
    }

    const isEqual = await organizationAdmin.isPasswordEqual(req.body.password, user.password);

    if (isEqual) {
      await adminVerification(user, res);
      return res.status(200).json({ type: "success", result: "Otp sent Successfully" });
    } else {
      throwError("Invalid Credentials", 401);
    }
  } catch (error) {
    console.log(error.message);
    res.status(error.code ?? 500).json({
      type: "failure",
      result: error?.message ?? "Server Not Responding",
    });
  }
};

/* get organization admin */
exports.getAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) throwError("Invalid organization admin id", 400);

    const user = await organizationAdmin.findById(id);
    if (!user) {
      throwError("User not found", 404);
    }

    return res.status(200).json({
      type: "success",
      result: "user found successfully!",
      organizerAdmin: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(error.code ?? 500).json({
      type: "failure",
      result: error?.message ?? "Server Not Responding",
    });
  }
};

/* verify  organization admin login otp */
exports.verifyLoginOTP = async (req, res) => {
  try {
    var otp = req.body.number;
    const data = await organizationAdmin.findOne({
      email: req.body.email.toLowerCase(),
    });

    const now = new Date();
    if (now > new Date(data.expireTime)) {
      throwError("OTP has been expired", 401);
    } else {
      if (otp == data.temporarycodeOTP.code) {
        res.status(200).json({ type: "success", result: "OTP has been verified" });
      } else {
        res.status(401).json({ type: "failure", result: "OTP is incorrect" });
      }
    }
  } catch (error) {
    console.log(error + "error");
    res.status(500).json({
      type: "failure",
      result: error.message ?? "Server Not Responding",
    });
  }
};

exports.verifyLoginOTP = async (req, res) => {
  try {
    var data = await organizationAdmin.findOne({ email: req.body.email.toLowerCase() });
    var otp = req.body.number;

    const now = new Date();
    const temporarycodeOTP = data?.temporarycodeOTP;
    if (now > new Date(temporarycodeOTP.expireTime)) {
      res.status(401).json({ type: "failure", result: "OTP has been expired" });
    } else {
      if (otp === temporarycodeOTP.code) {
        const token = getToken(data, "organizationAdmin", req);

        setCookies(res, token);

        res.status(200).json({
          type: "success",
          result: "organization Login Successfully",
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
