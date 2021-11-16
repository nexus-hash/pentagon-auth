const client = require("../../database/db");
const jwt = require("jsonwebtoken");
const genTID = require('./gentid')

async function createTask(req, res, next) {
  var message = "";
  try {
    await client.connect();
    var taskdata = req.body.taskdata;
    var team_id = req.body.teamid;
    var task_id = await genTID(client);
    taskdata.task_id = task_id;
    var result = await client.db("data").collection("projects").updateOne({_id:team_id},{$push:{projecttasks:{taskdata}}});
    message = "Task created successfully";
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