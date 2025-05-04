const express = require("express");

const organizationAdminController = require("../controllers/organizationAdmin");
const { checkIfAuthenticated } = require("../middlewares/authenticator");
const { upload } = require("../middlewares/organization");
const { accessRoles } = require("../constants/roles");
const { checkRole } = require("../helper/checkRole");
const router = express.Router();

/* create organization admin */
router.post(
  "/createOrganizerAdmin",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  upload.single("image"),
  organizationAdminController.createOrganizerAdmin
);

/* edit organization admin */
router.post(
  "/edit",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  upload.single("image"),
  organizationAdminController.edit
);

/* get organization admin */
router.get(
  "/getAdmin/:id",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  organizationAdminController.getAdmin
);

/* get organization projects */
router.get(
  "/getProjects",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  organizationAdminController.getProjects
);

/* get organization's departments */
router.get(
  "/getDepartments",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  organizationAdminController.getDepartments
);

/* verify organization */
router.get("/verify", organizationAdminController.verify);

/* organization login */
router.post("/login", organizationAdminController.login);

/* organization verify login otp */
router.post("/verifytempOTP", organizationAdminController.verifyLoginOTP);

/* get organization's departments */
router.get(
  "/getAdmins",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  organizationAdminController.getAdmins
);

exports.routes = router;
