const client = require("../../database/db");
const jwt = require("jsonwebtoken");
const genPID = require("./genpid");
const genFID = require("./genFID");
const getjoinId = require("./genjoinid");

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
    var joinId = getjoinId();
    await client.db('data').collection('projects').insertOne({
      _id: project_id,
      pname: project_name,
      pdesc: project_description,
      joinId: joinId,
      projectmembers:[
        {
          userid:user_id,
          isAdmin:true,
        }
      ],
      projecttasks:[],
      projectmaterials:[
        {
          folderid: default_folder_id,
          foldername:"Materials",
          contents:[]
        }
      ]
    });
    acknowledge = "success";
  }
  } catch (error) {
    console.log(error);
    acknowledge = "failure";
  }finally{
    await client.close();
    res.json({
      acknowledge: acknowledge,
    });

  }
}

module.exports = createTeam;
