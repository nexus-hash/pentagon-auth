const client = require("../../database/db");
const jwt = require("jsonwebtoken");

async function joinTeam(req, res, next) {
  var acknowledge = "";
  try {
    await client.connect();
    var user_id = req.body.uid;
    var joinId = req.body.joinId;
    var username = req.body.uname;
    var result = await client.db("data").collection("projects").findOne({joinId:joinId});
    if(result === null) {
      acknowledge = "Team not found";
      console.log(acknowledge);
    }else {
      var members = result.projectmembers;
      var flag = 0;
      for(var i=0;i<members.length;i++) {
        if(members[i].userid === user_id) {
          flag = 1;
          break;
        }
      }
      if(flag === 1) {
        acknowledge = "Already member";
      }else {
        await client.db("data").collection("projects").updateOne({joinId:joinId},{$push:{projectmembers:{userid:user_id,username:username,isAdmin:false}}});
        acknowledge = "You have joined the team";
      }
    }
  } catch (error) {
    console.log(error);
    acknowledge = "Error in joining team";
  }finally{
    await client.close();
    res.json({
      acknowledge: acknowledge
    });
  }
}

module.exports = joinTeam;
