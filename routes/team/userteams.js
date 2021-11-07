const client = require("../../database/db");
const jwt = require("jsonwebtoken");

function getUserTeam(req, res, next) {
  res.send("getUserTeam");
}

module.exports = getUserTeam;
