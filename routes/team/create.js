const client = require("../../database/db");
const jwt = require("jsonwebtoken");

function createTeam(req, res, next) {
  res.send("create team");
}

module.exports = createTeam;
