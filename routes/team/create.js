const client = require("../../database/db");
const jwt = require("jsonwebtoken");
const genPID = require("./genpid");
const genFID = require("./genFID");

async function createTeam(req, res, next) {
  var acknowledge = "";
  try {
    await client.connect();
    var user_id = req.body.uid;
    var project_name = req.body.pname;
    var project_description = req.body.pdesc;
    if(user_id === undefined || project_name === undefined || project_description === undefined) {
      acknowledge = "Please provide all the details";
    }else{
    var project_id = await genPID(client);
    var default_folder_id = await genFID(client);
    await client.db('data').collection('projects').insertOne({
      _id: project_id,
      pname: project_name,
      pdesc: project_description,
    });
    await client.db('data').collection('projectmembers').insertOne({
      _id: project_id,
      members: [{
        user_id: user_id,
        isAdmin: true,
      }],
    })
    await client.db('data').collection('projecttasks').insertOne({
      _id: project_id,
      tasks: [],
    })
    await client.db('data').collection('projectfiles').insertOne({
      _id: project_id,
      files: [{
        file_id: default_folder_id,
        f_name: "Materials",
        f_content: [],
      }],
    })
    acknowledge = "Team Created Successfully";
  }
  } catch (error) {
    console.log(error);
    acknowledge = "Error Creating Team";
  }finally{
    await client.close();
    res.json({
      acknowledge: acknowledge,
    });

  }
}

module.exports = createTeam;
