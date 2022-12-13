// create controllers later use by uesrRoutes.js
// create functions here to manage what each routes do

// bring in the express-async-handler, then wrap our function in asyncHandler
const asyncHandler = require("express-async-handler");
// bring in bcrypt to hash the password to put it in database
const bcrypt = require("bcryptjs");
// bring in JWT
const jwt = require("jsonwebtoken");
// bring in user model
const User = require("../models/userModels");

// @desc Register a new user
// @route /api/users
// @access public (no need password to access)
// const registerUser = (req, res) => {
const registerUser = asyncHandler(async (req, res) => {
  // see server.js, this used to require bodyparser, now included in express
  // console.log(req.body);
  const { name, email, password } = req.body;
  // validation
  // if (!name || !email || !password) {
  //   return res.status(400).json({ message: "Please enclude all fields" });
  // }
  // we want the system to identify it as error, inseat of just a response
  // throw new Error alone will display a regular HTML error and other junk message
  // so we want to create a middleware to handle errors, in errorHandler.js to get a json object
  // errorMiddleware.js will OVERRIDE existing "throw new Error()"
  // now "throw new Error()" will display JSON object error message, with stacktrace line number of the bug
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enclude all fields");
  }
  // Find if user already exists, find by email
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exista");
  }

  // Hash password
  // salt is a random string that makes the hash unpredictable in Bcrypt
  // use salt to hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  // after user successfully created into db, show the response back data
  // status(201) means create things
  // _id is how db name its id
  // we also want to response back a JWT
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  // res.send("Register Route");
});

// @desc Login a new user
// @route /api/users/login
// @access public (no need password to access)
// const loginUser = (req, res) => {
const loginUser = asyncHandler(async (req, res) => {
  // find login info from db, if found user, then check password
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // use bcrypt "compare()" to compare input password and the db hashed password ***
  // status(401) mean unauthorized
  // we also want to response back a JWT
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  // res.send("Login Route");
});

// @desc Get current user
// @route /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  // res.send("me");
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

// generate token
// use "jwt.sign()" with "id" passing in, and "JWT_SECRET" in .env file, and assign expiration "expiresIn"
// '30d' means 30 days
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
