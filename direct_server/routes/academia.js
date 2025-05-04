const express = require("express");

const academiaController = require("../controllers/academia");
const userProfileMulter = require("../middlewares/userProfile");
const { checkIfAuthenticated } = require("../middlewares/authenticator");

const router = express.Router();

router.post("/getmyprofile", academiaController.getmyprofile);
router.get("/getAllUsers", academiaController.getAllUsers);
router.post(
  "/createOrupdateprofile",
  userProfileMulter.upload.single("image"),
  checkIfAuthenticated,
  academiaController.createOrupdateprofile
);

exports.routes = router;
