const path = require("path");
const colors = require("colors");
require("dotenv").config({ path: "./config/config.env" });
const morgan = require("morgan");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const bootcampsRouter = require("./routes/bootcamps");

//Connect to the database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
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
