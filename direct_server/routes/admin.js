const express = require("express");

const adminController = require("../controllers/admin");
const subadminController = require("../controllers/admin/subadmin");
const uploadMiddleware = require("../middlewares/uploadCkeditor");
const { checkIfAuthenticated } = require("../middlewares/authenticator");
const { checkRole } = require("../helper/checkRole");
const { accessRoles } = require("../constants/roles");
const router = express.Router();

router.get("/verify", adminController.Verify);
router.post("/signin", adminController.signIn);
router.post("/verifytempOTP", adminController.verifyTempOTP);
router.post("/otpsend", adminController.OTP);
router.post("/verifyotp", adminController.verifyOTP);
router.post("/changepassword", adminController.changePassword);
router.patch(
  "/reqChangesInProposal",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super, accessRoles.admins.projectManager]),
  adminController.reqChangesInProposal
);
router.post(
  "/getProposalsForIndustryAcademia",
  checkIfAuthenticated,
  checkRole([accessRoles.users.all]),
  adminController.getProposalsForIndustryAcademia
);
router.post(
  "/getProjectMilestones",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super, accessRoles.admins.projectManager]),
  adminController.getProjectMilestones
);
router.get("/getAllAdmins", checkIfAuthenticated, adminController.getAllAdmins);
router.get(
  "/getAllUserProjectSubmittors",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super, accessRoles.admins.projectManager]),
  adminController.getAllUserProjectSubmittors
);
router.post(
  "/getAllFeedbackOfProject",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super, accessRoles.admins.projectManager]),
  adminController.getAllFeedbackOfProject
);
router.patch(
  "/completeProject",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  adminController.completeProject
);
router.post("/multipleImages", uploadMiddleware, (req, res) => {
  console.log("file uploaded");
});

/* get usrs*/
router.get(
  "/getUSRS",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  adminController.getUSRS
);

/*  create subadmin */
router.post(
  "/createSubAdmin",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  subadminController.createSubAdmin
);
router.get(
  "/getSubAdmins",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  subadminController.getSubAdmins
);

exports.routes = router;
