const express = require("express");
const router = express.Router();
const { isAuthenticated, isSeller } = require("../middleware");
const { gigController } = require("../controller");

router
  .route("/")
  .post(isAuthenticated, isSeller, gigController.createGig)
  .get(gigController.getAllGigs);
router
  .route("/:id")
  .delete(isAuthenticated, gigController.deleteGig)
  .get(gigController.getGig);

module.exports = router;
