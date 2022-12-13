// break into multiple file by use router
// export router, and use in server.js
const express = require("express");
const router = express.Router();
// access file userController.js bring in 2 functions registerUser(), loginUser()
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

// bring in the protect function from authMiddleware.js
// to protect a route add "protect" as the second argument
const { protect } = require("../middleware/authMiddleware");

// /api/users route
// instead of app.post("/",), do router.post("/",)
// router.post("/", (req, res) => {
//   res.send("Register Route");
// });
// replace our inner function with contolllers function
router.post("/", registerUser);

// /api/users/login route
// router.post("/login", (req, res) => {
//   res.send("Login Route");
// });
// replace our inner function with contolllers function
router.post("/login", loginUser);

// /api/users/me route
// to protect a route add "protect" as the second argument
router.get("/me", protect, getMe);

// need to export router
module.exports = router;
