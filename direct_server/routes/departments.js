const express = require("express");

const departmentController = require("../controllers/departments");
const { checkIfAuthenticated } = require("../middlewares/authenticator");
const { upload } = require("../middlewares/department");
const { accessRoles } = require("../constants/roles");
const { checkRole } = require("../helper/checkRole");
const router = express.Router();

/* create department */
router.post(
  "/create",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.department.departmentAdmin,
    accessRoles.organizations.organizationAdmin,
  ]),
  upload.single("image"),
  departmentController.create
);
/* add department members */
router.post(
  "/addMember",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.department.departmentAdmin,
    accessRoles.organizations.organizationAdmin,
  ]),
  upload.single("image"),
  departmentController.addMember
);

/* add department members */
router.post(
  "/getMembers/:id",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.department.all,
    accessRoles.organizations.organizationAdmin,
  ]),
  departmentController.getMembers
);

/* edit organization */
router.post(
  "/edit",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super, accessRoles.organizations.organizationAdmin]),
  upload.single("image"),
  departmentController.edit
);

/* get organization */
router.get(
  "/getDepartments",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.department.all,
    accessRoles.organizations.organizationAdmin,
  ]),
  departmentController.getDepartments
);

/* get Department Executive Admin */
router.get(
  "/getDepartmentExecutiveAdmin",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.department.all,
    accessRoles.organizations.organizationAdmin,
  ]),
  departmentController.getDepartmentExecutiveAdmin
);

/* getDepartmentSuperAdmin */
router.get(
  "/getDepartmentSuperAdmin",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.department.all,
    accessRoles.organizations.organizationAdmin,
  ]),
  departmentController.getDepartmentSuperAdmin
);

/* get Department Yearly Projects */
router.get(
  "/getDepartmentYearlyProjects",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.department.all,
    accessRoles.organizations.organizationAdmin,
  ]),
  departmentController.getDepartmentYearlyProjects
);

/* get Department Yearly Projects */
router.get(
  "/getDepartmentsProjects",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super, accessRoles.department.all]),
  departmentController.getDepartmentsProjects
);

/* get Department Yearly Projects */
router.get(
  "/getDepartmentsProjectsCount",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.department.all,
    accessRoles.organizations.organizationAdmin,
  ]),
  departmentController.getDepartmentsProjectsCount
);

/* get organization id*/
router.get(
  "/getDepartmentOne",
  checkIfAuthenticated,
  checkRole([
    accessRoles.admins.super,
    accessRoles.department.all,
    accessRoles.organizations.organizationAdmin,
  ]),
  departmentController.getDepartmentOne
);

/* list organizations */
router.get(
  "/list",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  departmentController.list
);

/* remove organization */
router.delete(
  "/removeOrganization/:id",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  departmentController.removeOrganization
);

/* remove organization admin */
router.delete(
  "/removeOrganizationAdmin/:id",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  departmentController.removeOrganizationAdmin
);
/* remove organization admin */
router.post(
  "/getProjectMilestones",
  checkIfAuthenticated,
  checkRole([accessRoles.department.all, accessRoles.organizations.organizationAdmin]),
  departmentController.getProjectMilestones
);

/* remove organization admin */
router.post("/login", departmentController.login);
/* remove organization admin */
router.post("/verifytempOTP", departmentController.verifyTempOTP);

exports.routes = router;
