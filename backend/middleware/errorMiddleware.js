// this errorMiddleware.js will OVERRIDE existing "throw new Error()"
// now "throw new Error()" will display JSON object error message, with stacktrace line number of the bug
// in production, will not show stacktrace
// require by server.js
const errorHandler = (err, req, res, next) => {
  // res.statusCode is the status code that I set inside validation, EX: res.status(400);
  // if status code exist assign that status code, else assign 500 server error
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  // send back a message, if this app in development also send stacktrace, if in production don't send stacktrace
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// export errorHandler
module.exports = { errorHandler };
