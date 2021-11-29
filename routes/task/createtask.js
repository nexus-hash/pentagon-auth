const client = require("../../database/db");
const jwt = require("jsonwebtoken");
const genTID = require('./gentid');
const { mailMessageForNewTask } = require("../../mailer/mailFormat");
const sendMail = require("../../mailer/sendEmail");

async function createTask(req, res, next) {
  var message = "";
  try {
    await client.connect();
    var taskdata = req.body.taskdata;
    var team_id = req.body.teamid;
    var task_id = await genTID(client);
    taskdata.task_id = task_id;
    var result = await client.db("data").collection("projects").updateOne({_id:team_id},{$push:{projecttasks:{taskdata}}});
    if(result.modifiedCount>0){
    message = "Task created successfully";
    var result2 = await client.db("data").collection("projects").findOne({_id:team_id});
    var assigneeDetails = await client.db("data").collection("users").findOne({_id:taskdata.assign.userid});
    var mailBody = mailMessageForNewTask(taskdata.deadline,taskdata.taskTitle,result2.pname,0);
    var email = assigneeDetails.email;
    var subject = "New task in project"+result2.pname;
    sendMail(email,subject,mailBody);
    }
  } catch (error) {
    message = "Error in creating task";
    console.log(error);
  }finally{
    res.send({
      message: message,
    })
  }
}

module.exports = createTask;