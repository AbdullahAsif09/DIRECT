const express = require("express");
const router = express.Router();
const { InvalidRoute } = require("../helper/InvalidRoute");
const {
  checkIfAuthenticated,
  checkIfUserHadToken,
} = require("../middlewares/authenticator");
const {
  validateRole,
  refreshCookie,
  logout,
  getprofile,
} = require("../controllers/auth");

router.post("/validateRole", checkIfAuthenticated, validateRole);
router.post("/refresh", checkIfAuthenticated, refreshCookie);
router.post("/logout", checkIfUserHadToken, logout);
router.post("/getprofile", checkIfAuthenticated, getprofile);
router.all("*", InvalidRoute);

module.exports = router;
