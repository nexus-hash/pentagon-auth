const client = require("../../database/db");

async function UpdateProgress(req,res,next) {
  var message = "";
  var updatedData;
  try {
    await client.connect();
    const dbProjectCollection = client.db("data").collection("projects");
    var update = req.body.taskdata;
    var teamid = req.body.teamid;
    var taskid = req.body.taskid;
    var getTask = await dbProjectCollection.findOne({_id:teamid,projecttasks:{$elemMatch:{"taskdata.task_id":taskid}}},{projection:{"projecttasks.taskdata":1}});
    console.log(update);

    var result = await dbProjectCollection.updateOne({_id:teamid,projecttasks:{$elemMatch:{"taskdata.task_id":taskid}}},{$set:{"projecttasks.$":update}});
  } catch (error) {
    message = "Error updating progress";
  } finally{
    await client.close();
    res.send({
      message: message,
      updatedData: updatedData
    });
  }
}

module.exports = UpdateProgress;