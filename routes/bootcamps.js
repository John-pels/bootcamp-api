const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

// Include other resource router
const coursesRouter = require("./courses");

const bootcampsRouter = express.Router();

//Re-route into other resource router
bootcampsRouter.use("/:bootcampId/courses", coursesRouter);

bootcampsRouter.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

bootcampsRouter.route("/:id/photo").put(bootcampPhotoUpload);

bootcampsRouter.route("/").get(getBootcamps).post(createBootcamp);

bootcampsRouter
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = bootcampsRouter;
