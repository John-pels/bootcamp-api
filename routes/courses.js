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
const { protect } = require("../middleware/auth");

coursesRouter
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description location.state location.city",
    }),
    getCourses
  )
  .post(protect, addCourse);
coursesRouter
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = coursesRouter;
