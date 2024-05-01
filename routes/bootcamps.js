const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

const bootcampsRouter = express.Router();

bootcampsRouter.route("/").get(getBootcamps).post(createBootcamp);

bootcampsRouter
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = bootcampsRouter;
