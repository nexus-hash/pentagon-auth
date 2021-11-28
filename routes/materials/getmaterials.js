const client = require("../../database/db");
const jwt = require("jsonwebtoken");

async function GetFolder(req, res, next) {
  var message = "";
  var folders;
  try {
    await client.connect();
    var teamid = req.body.teamid;
    var result = await client.db("data").collection("projects").findOne({_id: teamid},{projection:{projectmaterials:1}});
    console.log(result);
    if(result){
      message = "success";
      folders = result.projectmaterials;
    }
  } catch (error) {
    message = "error";
  } finally {
    await client.close();
    res.send({
      message: message,
      folders: folders
    });
  }
}

module.exports = GetFolder;
