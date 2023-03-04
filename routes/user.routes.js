const express = require("express");
const router = express.Router();

const { userController } = require("../controller");
const { isAuthenticated } = require("../middleware");

router.route("/:id").delete(isAuthenticated, userController.deleteUser);

module.exports = router;
