require("dotenv").config({ path: "./config/config.env" });
const fs = require("fs");
const colors = require("colors");
const mongoose = require("mongoose");

//Load models
const User = require("./models/User");
const Course = require("./models/Course");
const Bootcamp = require("./models/Bootcamp");

//Connect to DB
mongoose.connect(process.env.MONGO_DB_URI);

//Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

//Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Course.create(courses);
    await Bootcamp.create(bootcamps);
    console.log("Data Imported Successfully...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete Data

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();
    await Bootcamp.deleteMany();
    console.log("Data Destroyed Successfully...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
