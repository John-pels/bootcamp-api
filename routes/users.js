const User = require("../models/User");
const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const usersRouter = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

usersRouter.use(protect);
usersRouter.use(authorize("admin"));
usersRouter.route("/").get(advancedResults(User), getUsers).post(createUser);

usersRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = usersRouter;
