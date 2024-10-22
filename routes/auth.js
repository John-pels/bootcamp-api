const express = require("express");
const {
  login,
  getMe,
  logout,
  register,
  resetPassword,
  updateDetails,
  forgotPassword,
  updatePassword,
  confirmEmail,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/me", protect, getMe);
authRouter.put("/update-details", protect, updateDetails);
authRouter.put("/update-password", protect, updatePassword);
authRouter.post("/forgot-password", forgotPassword);
authRouter.put("/reset-password/:resetToken", resetPassword);
authRouter.get("/confirm-email", confirmEmail);

module.exports = authRouter;
