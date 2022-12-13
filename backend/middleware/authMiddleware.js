const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");

// our function to protect route
const protect = asyncHandler(async (req, res, next) => {
  // the token is a "Bearer Token"
  // look under postman, authorization, type Bearer Token
  // it formeted as "Bearer Token" with whitespace inbetween
  let token;

  // req.headers.authorization get both the Bearer and Token as single string
  // check if there is header authorization, then check if there are Bearer Token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      // split "Bearer Token" with whitespace into array, like [Bearer, Token]
      // get the Token part of the array
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      // use jwt.verify() to decode the token with JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      // the decoded token will have the user id in it
      // User.findById() find user by id, but don't get the password field, use select to exclude
      req.user = await User.findById(decoded.id).select("-password");

      // continue to next middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  // check if there is no token
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
