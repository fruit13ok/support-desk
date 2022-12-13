// this is user schema
// bring in mongoose
const mongoose = require("mongoose");

// create user schema with object of fields
// Schema upper case
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
    },
    email: {
      type: String,
      require: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export model, code differently, "User" is upper case, so bring it in as upper case
module.exports = mongoose.model("User", userSchema);
