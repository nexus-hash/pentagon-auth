const client = require("../../database/db");
const genFID = require("../team/genFID");

async function AddNewFolder(req,res,next){
  var message = "";
  try {
    await client.connect();
    var foldername = req.body.foldername;
    var teamid = req.body.teamid;
    var folderid = await genFID(client);
    await client.db('data').collection('projects').updateOne({_id:teamid},{$push:{projectmaterials:{foldername:foldername,folderid:folderid,contents:[]}}});
    message = "Folder added successfully";
  } catch (error) {
    message = "Error creating folder";
  } finally{
    await client.close();
    res.send({message:message});
  }
}

module.exports = AddNewFolder;