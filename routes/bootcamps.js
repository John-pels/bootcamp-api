const express = require("express");
const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");
const { protect, authorize } = require("../middleware/auth");

// Include other resource router
const coursesRouter = require("./courses");
const reviewsRouter = require("./reviews");

const bootcampsRouter = express.Router();

//Re-route into other resource router
bootcampsRouter.use("/:bootcampId/courses", coursesRouter);
bootcampsRouter.use("/:bootcampId/reviews", reviewsRouter);

bootcampsRouter.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

bootcampsRouter
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

bootcampsRouter
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

bootcampsRouter
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = bootcampsRouter;
