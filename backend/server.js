// bring in express
const express = require("express");
// bring in colors, now can use throught this app
const colors = require("colors");
// bring in db.js connection function
const connectDB = require("./config/db");
// access envirnment variable from the root directory .env file, run the config function
const dotenv = require("dotenv").config();
// access .env file variable
const PORT = process.env.PORT || 8000;

// inport errorMiddleware
const { errorHandler } = require("./middleware/errorMiddleware");

// run connect to db
connectDB();

const app = express();

// middlewares ***
// allow to send raw json and urlencoded form
// these 2 lines used to be bodyparser, 2 years ago express included bodyparser into express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create route
// root route
// get request
// use browser or postman for get request http://localhost:5000/
// send 'hello' string, or usually json object
// I can set status code
app.get("/", (req, res) => {
  // res.send("hello");
  res.status(200).json({ message: "at root route" });
});

// api/user route
// app.get("/api/user", (req, res) => {
//   res.status(200).json({ message: "at api/user route" });
// });
// better way is use router in separate files with app.use()

// Routes ***
// create "/api/users" route, by point to route file userRoutes.js "./routes/userRoutes"
// "/api/users" can be any path name
app.use("/api/users", require("./routes/userRoutes"));

// use errorHandler from errorMiddleware
// now "throw new Error()" will display JSON object error message, with stacktrace line number of the bug
app.use(errorHandler);

// listen to port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
