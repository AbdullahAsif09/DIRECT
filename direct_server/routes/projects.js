const express = require("express");

const projectController = require("../controllers/projects");
const projectMulter = require("../middlewares/projectMulter");
const SetProjectId = require("../controllers/SetProjectId");
const { checkIfAuthenticated } = require("../middlewares/authenticator");
const { checkRole } = require("../helper/checkRole");
const { accessRoles } = require("../constants/roles");
const router = express.Router();
router.post(
  "/addproject",
  SetProjectId.seProjectId,
  projectMulter.uploadMultiDocs.fields([
    { name: "image" },
    { name: "document" },
  ]),
  projectMulter.multerError,
  projectController.addproject
);
router.get("/getprojects", projectController.getprojects);
router.get(
  "/getProjectsUnclassified",
  projectController.getProjectsUnclassified
);
router.patch(
  "/updateproject",
  projectMulter.uploadMultiDocs.fields([
    { name: "image" },
    { name: "document" },
  ]),
  projectController.updateproject
);
router.put("/updateProjectManger", projectController.updateProjectManger);
router.get("/getOneProject", projectController.getprojectone);
router.put("/publishproject", projectController.publishproject);
router.post("/getProjectsForUser", projectController.getProjectsForUser);
router.patch(
  "/sendProjectsForViewingDetials",
  projectController.sendProjectsForViewingDetials
);
router.post(
  "/getPublishedProjects",
  checkIfAuthenticated,
  projectController.getPublishedProjects
);
router.post("/getProjectForReviewer", projectController.getProjectForReviewer);
router.get("/getProjectsInDraft", projectController.getProjectsInDraft);
router.put("/updateProjectDraft", projectController.updateProjectDraft);
router.post(
  "/getProjectsForFundingAgency",
  projectController.getProjectsForFundingAgency
);
router.get(
  "/getProjectsForUserAgency",
  checkIfAuthenticated,
  projectController.getProjectsForUserAgency
);
router.get("/getmembers", projectController.getmembers);
router.post(
  "/deleteproject",
  checkIfAuthenticated,
  checkRole([accessRoles.admins.super]),
  projectController.deleteproject
);

exports.routes = router;
