const express = require("express");

const organizationController = require("../controllers/organization");
const { checkIfAuthenticated } = require("../middlewares/authenticator");
const { upload } = require("../middlewares/organization");
const { accessRoles } = require("../constants/roles");
const { checkRole } = require("../helper/checkRole");
const router = express.Router();

/* create organization */
router.post(
  "/create",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  upload.single("image"),
  organizationController.create
);

/* edit organization */
router.post(
  "/edit",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  upload.single("image"),
  organizationController.edit
);

/* get organizations */
router.get(
  "/getAllOrganizations",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  organizationController.getAllOrganizations
);

/* get one organization */
router.get(
  "/getOrganization/:id",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  organizationController.getOrganization
);
/* get one organization */
router.get(
  "/getOrganizationStats/:id",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  organizationController.getOrganizationStats
);

/* get  organization */
router.get(
  "/getOrganizationProjects/:id",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
  ]),
  organizationController.getOrganizationProjects
);

/* list organizations */
router.get(
  "/list",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  organizationController.list
);

/* remove organization */
router.delete(
  "/removeOrganization/:id",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  organizationController.removeOrganization
);

/* remove organization admin */
router.delete(
  "/removeOrganizationAdmin/:id",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  organizationController.removeOrganizationAdmin
);

exports.routes = router;
