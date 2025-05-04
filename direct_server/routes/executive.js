const express = require("express");

const executiveController = require("../controllers/executive");
const { upload } = require("../middlewares/executive");
const { checkIfAuthenticated } = require("../middlewares/authenticator");
const { checkRole } = require("../helper/checkRole");
const { accessRoles } = require("../constants/roles");
const router = express.Router();

router.post(
  "/create",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.organizations.organizationAdmin,
    accessRoles.department.departmentAdmin,
  ]),
  upload.single("image"),
  executiveController.create
);
router.post("/signin", executiveController.signIn);
router.get("/totalUsers", executiveController.totalUsers);
router.post("/verifytempOTP", executiveController.verifyTempOTP);
router.get("/totalIndustries", executiveController.totalIndustries);
router.get("/totalAcademia", executiveController.totalAcademia);
router.get("/totalProjects", executiveController.totalProjects);
router.get(
  "/totalProjectsInprogress",
  executiveController.totalProjectsInprogress
);
router.get(
  "/countProjectsCreatedInMonth",
  executiveController.countProjectsCreatedInMonth
);
router.get("/getProjects/:id", executiveController.getProjects);
router.get(
  "/getDashboardDetails",
  executiveController.exectiveDashboardDetails
);
router.get(
  "/getprojectsDataByOrganization",
  executiveController.projectsDataByOrganization
);
router.get(
  "/getDashboardSummaryByOrganization/:organizationId",
  executiveController.executiveDashboardSummaryByOrganization
);

router.get(
  "/getOrganizationProjectData/:organizationId",
  executiveController.getOrganizationProjectData
);

router.get(
  "/getDepartmentOverview/:departmentId",
  executiveController.getDepartmentOverview
);

router.get(
  "/getProjectsDataForDepartments",
  executiveController.getProjectsDataForDepartments
);
router.get(
  "/getProjectsOntimeDataForDepartments",
  executiveController.getProjectsOntimeDataForDepartments
);

exports.routes = router;
