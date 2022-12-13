//
const mongoose = require("mongoose");

// function use to connect to db
// use async / await to wait for db connection, then log the db host name
// use colors, that was bring in to server.js, code like:
//  .cyan.underline
// review:
// process.exit(1) // it is node end with uncaught error, exit(0) is normal node end
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
