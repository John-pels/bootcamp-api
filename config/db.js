const mongoose = require("mongoose");

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_DB_URI);
  console.log(
    `Connected to Mongo Database: ${connect.connection.host}`.cyan.underline
      .bold
  );
};

module.exports = connectDB;
