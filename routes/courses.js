const express = require("express");
const { getCourses, getCourse, addCourse } = require("../controllers/courses");

const coursesRouter = express.Router({ mergeParams: true });

coursesRouter.route("/").get(getCourses).post(addCourse);
coursesRouter.route("/:id").get(getCourse);

module.exports = coursesRouter;
