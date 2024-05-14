const express = require("express");
const {
  login,
  getMe,
  register,
  resetPassword,
  updateDetails,
  forgotPassword,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);
authRouter.put("/update-details", protect, updateDetails);
authRouter.post("/forgot-password", forgotPassword);
authRouter.put("/reset-password/:resetToken", resetPassword);

module.exports = authRouter;
