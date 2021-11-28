const client = require("../../database/db");
const jwt = require("jsonwebtoken");

async function DeleteTask(req,res,next) {
  var message = "";
  try {
    await client.connect();
    var taskid = req.body.taskid;
    var teamid = req.body.teamid;
    var result = await client.db("data").collection("projects").updateOne({_id:teamid},{$pull:{"projecttasks.taskdata":{task_id}}});
    console.log(result);
    if(result.modifiedCount>0){
      message = "sucess";
    }
    else{
      message = "error";
    }
  } catch (error) {
    message = "error";
  } finally {
    await client.close();
    res.send({
      message:message
    });
  }
}

module.exports = DeleteTask;