const client = require("../../database/db");
const jwt = require("jsonwebtoken");

function joinTeam(req, res, next) {
  res.send("join team");
}

module.exports = joinTeam;
