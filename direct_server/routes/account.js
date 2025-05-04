const express = require("express");
const USER = require("../controllers/account");
const router = express.Router();
const { InvalidRoute } = require("../helper/InvalidRoute");
const { checkIfAuthenticated } = require("../middlewares/authenticator");

router.route("/create").post(USER.create).all(InvalidRoute);
router.route("/signin").post(USER.login).all(InvalidRoute);
router.route("/forgotpassword").post(USER.forgotPassword).all(InvalidRoute);
router
  .route("/verifyforgotpasswordotp")
  .post(USER.verifyforgotpasswordotp)
  .all(InvalidRoute);

router.route("/resetPassword").post(USER.resetPassword).all(InvalidRoute);
router.route("/verify").get(USER.verifyuser).all(InvalidRoute);
/* not required  */
router
  .route("/getprofile")
  .get(checkIfAuthenticated, USER.getprofile)
  .all(InvalidRoute);

router
  .route("/getmyprofile")
  .get(checkIfAuthenticated, USER.getmyprofile)
  .all(InvalidRoute);

router.route("/getallusers").get(USER.getAllUsers).all(InvalidRoute);

/* uploading  */

exports.routes = router;
