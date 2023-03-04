const express = require("express");
const router = express.Router();

const { authController } = require("../controller");
const { isAuthenticated } = require("../middleware");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/logout").post(isAuthenticated, authController.logout);

module.exports = router;
