const express = require("express");
const router = express.Router();

const { checkIfAuthenticated } = require("../middlewares/authenticator");
const chatController = require("../controllers/projectComments");
const { checkRole } = require("../helper/checkRole");
const { accessRoles } = require("../constants/roles");

router.get(
  "/getComments/:id",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.executive.all,
    accessRoles.department.all,
    accessRoles.organizations.organizationAdmin,
  ]),
  chatController.getComments
);

router.post(
  "/addComment/:id",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.executive.all,
    accessRoles.department.all,
    accessRoles.organizations.organizationAdmin,
  ]),
  chatController.addComment
);

/* public projects chat */

module.exports = router;
