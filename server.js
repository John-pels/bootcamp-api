require("colors");
require("dotenv").config({ path: "./config/config.env" });
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const fileupload = require("express-fileupload");
const usersRouter = require("./routes/users");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const coursesRouter = require("./routes/courses");
const reviewsRouter = require("./routes/reviews");
const bootcampsRouter = require("./routes/bootcamps");
const mongoSanitize = require("express-mongo-sanitize");

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

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Request rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100,
});
app.use(limiter);

// Prevent http parameter pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/bootcamps", bootcampsRouter);

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
