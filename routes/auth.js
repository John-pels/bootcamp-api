const express = require("express");
const { register } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", register);

module.exports = authRouter;
