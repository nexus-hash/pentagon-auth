const client = require("../../database/db");
const jwt = require("jsonwebtoken");

async function deleteFolder(req,res,next){
  var message = "";
  try {
    await client.connect();
    console.log(req.body);
    var folderid = req.body.folderid;
    var team_id = req.body.teamid;
    
    var result = await client.db("data").collection("projects").updateOne({_id:team_id},{$pull:{projectmaterials:{folderid}}});
    if(result.modifiedCount>0){
      message = "sucess";
    }else{
      message = "error";
    }
    console.log(result);
  } catch (error) {
    console.log(error);
    message = "error";
  } finally {
    await client.close();
    res.send({
      message: message
    })
  }
}

module.exports = deleteFolder;