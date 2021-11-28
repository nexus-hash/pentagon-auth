const client = require("../../database/db");

async function AddUrl(req,res,next) {
  var message = "";
  var updatedData ;
  try {
    await client.connect();
    var teamid = req.body.teamid;
    var folderid = req.body.folderid;
    var url = req.body.url;
    var result = await client
      .db("data")
      .collection("projects")
      .updateOne(
        { "projectmaterials.folderid": folderid },
        { $push: { "projectmaterials.$.contents": url } }
      );
      console.log(result);
      var newdata = await client.db("data").collection("projects").findOne({"projectmaterials.folderid":folderid});
      message = "success";
      var updated = newdata.projectmaterials.filter(function(obj) {
        return obj.folderid == folderid;
      });
      updatedData = updated[0].contents;
  } catch (error) {
    console.log(error);
    message = "Error adding new url";
  } finally{
    await client.close();
    res.send({
      message: message,
      updatedData: updatedData
    })
  }
}

module.exports = AddUrl;