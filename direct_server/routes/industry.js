const express = require("express");

const IndustryController = require("../controllers/industry");
const userProfileMulter = require("../middlewares/userProfile");
const { checkIfAuthenticated } = require("../middlewares/authenticator");
const router = express.Router();

router.get("/getAllUsers", IndustryController.getAllUsers);
router.get(
  "/getmyprofile",
  checkIfAuthenticated,
  IndustryController.getmyprofile
);
router.post(
  "/createOrupdateprofile",
  userProfileMulter.upload.single("image"),
  checkIfAuthenticated,
  IndustryController.createOrupdateprofile
);

exports.routes = router;
