const express = require("express");
const roles = require("../modals/roles");
const { industry, academia } = require("../modals");

const fundingAgency = require("../modals/fundingAgency");
const userAgency = require("../modals/userAgency");
const admin = require("../modals/admin/admin");
const reviewer = require("../modals/reviewer");
const mongoose = require("mongoose");
const RolesController = require("../controllers/roles");
const router = express.Router();
const rolesController = new RolesController(
  industry,
  academia,
  fundingAgency,
  userAgency,
  admin,
  reviewer,
  roles,
  mongoose
);

router.post("/create", rolesController.create.bind(rolesController));
router.post(
  "/assignResearcher",
  rolesController.assignResearcher.bind(rolesController)
);
router.post(
  "/removeResearcher",
  rolesController.removeResearcher.bind(rolesController)
);

exports.routes = router;
