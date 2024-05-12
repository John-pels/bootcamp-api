const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const coursesRouter = express.Router({ mergeParams: true });

coursesRouter.route("/").get(getCourses).post(addCourse);
coursesRouter
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = coursesRouter;
