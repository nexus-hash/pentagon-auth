var express = require("express");
var router = express.Router();
var login = require("./login");
const sendCode = require("./sendCode");

router.post("/login", async function (req, res, next) {
  //login(req, res, next);
  res.send("add");
});

router.post("/sendCode", function (req, res, next) {
  sendCode(req, res, next);
});
module.exports = router;