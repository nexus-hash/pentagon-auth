const client = require("../../database/db");
const jwt = require("jsonwebtoken");

async function getUserTeam(req, res, next) {
  var message = "";
  var projects = [];
  try {
    await client.connect();
    var user_id = req.body.uid;
    var result = await client.db("data").collection("projects").aggregate([
      {
        $match: {
          projectmembers: {
            $elemMatch: {
              userid: user_id
            }
          }
        }
      }
    ])
      .toArray();
    if (result.length === 0) {
      message = "No team found";
    }
    else{
      projects = result;
    }
  } catch (error) {
    console.log(error);
  }finally{
    res.json({
      message: message,
      projects: projects
    });
  }
}

module.exports = getUserTeam;
