const express = require("express");
const { getCourses } = require("../controllers/courses");

const coursesRouter = express.Router({ mergeParams: true });

coursesRouter.route("/").get(getCourses);

module.exports = coursesRouter;
