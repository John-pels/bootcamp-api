const express = require("express");
const dotenv = require("dotenv");
const bootcampsRouter = require("./routes/bootcamps");
const morgan = require("morgan");
dotenv.config({ path: "./config/config.env" });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/bootcamps", bootcampsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
  );
});
