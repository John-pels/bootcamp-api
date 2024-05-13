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
const { protect } = require("../middleware/auth");

// Include other resource router
const coursesRouter = require("./courses");

const bootcampsRouter = express.Router();

//Re-route into other resource router
bootcampsRouter.use("/:bootcampId/courses", coursesRouter);

bootcampsRouter.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

bootcampsRouter.route("/:id/photo").put(protect, bootcampPhotoUpload);

bootcampsRouter
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, createBootcamp);

bootcampsRouter
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = bootcampsRouter;
