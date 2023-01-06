const express = require("express");
const route = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/authControllers");

const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/authValidator");

//pass on controllers
route.post("/signup", userSignupValidator, signup);
route.post("/signin", userSigninValidator, signin);
route.get("/signout", signout);

// test
route.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = route;
