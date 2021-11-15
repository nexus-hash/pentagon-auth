const client = require("../../database/db");
const jwt = require("jsonwebtoken");

async function getUserTeam(req, res, next) {
  var message = "";
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
      console.log(result);
    if (result.length === 0) {
      message = "No team found";
    }
    else{
      message = "Someteams";
    }
  } catch (error) {
    console.log(error);
  }finally{
    res.json({
      message: message,
    });
  }
}

module.exports = getUserTeam;
