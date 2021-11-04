var express = require("express");
const forgotPassword = require("./forgotpassword");
var router = express.Router();
var login = require("./login");
const sendCode = require("./sendCode");
var signup = require("./signup");
const verifytoken = require("./verifytoken");

/* 
  @route POST /api/auth/
  @desc Authentication Section
  @endpoints login, signup, forgotpassword, sendCode
*/

router.post("/login", async function (req, res, next) {
  login(req, res, next);
});

router.post("/signup",function (req,res,next) {
  signup(req,res,next);
})

router.post("/forgotpassword",function(req,res,next){
  forgotPassword(req,res,next);
})

router.post("/sendCode", function (req, res, next) {
  sendCode(req, res, next);
});

router.post("/verifytoken",function(req,res,next){
  verifytoken(req,res,next);
})
module.exports = router;