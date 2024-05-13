require("colors");
require("dotenv").config({ path: "./config/config.env" });
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const coursesRouter = require("./routes/courses");
const bootcampsRouter = require("./routes/bootcamps");

//Connect to the database
connectDB();

const app = express();

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/bootcamps", bootcampsRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`.yellow
      .bold
  );
});

//Handle unhandledpromise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
