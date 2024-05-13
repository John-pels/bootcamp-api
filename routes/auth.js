const express = require("express");
const { register, login, getMe } = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);

module.exports = authRouter;
