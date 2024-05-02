const express = require("express");
const dotenv = require("dotenv");
const bootcampsRouter = require("./routes/bootcamps");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

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
