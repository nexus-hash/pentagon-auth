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
    var result = await dbProjectCollection.updateOne({_id:teamid,projecttasks:{$elemMatch:{"taskdata.task_id":taskid}}},{$set:{"projecttasks.$":update}});
    if(result.modifiedCount>0){
      message = "success";
      updatedData = getTask.projecttasks[0];
      var result2 = await client
        .db("data")
        .collection("projects")
        .findOne({ _id: team_id });
      var assigneeDetails = await client
        .db("data")
        .collection("users")
        .findOne({ _id: taskdata.assign.userid });
      var mailBody = mailMessageForNewTask(
        taskdata.deadline,
        taskdata.taskTitle,
        result2.pname,
        0
      );
      var email = assigneeDetails.email;
      var subject = "New task in project" + result2.pname;
      sendMail(email, subject, mailBody);
    }
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