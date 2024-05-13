const Course = require("../models/Course");
const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");
const coursesRouter = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");

coursesRouter
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description location.state location.city",
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addCourse);
coursesRouter
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = coursesRouter;
