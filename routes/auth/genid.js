/* 
  @desc : Generate a new ID for a new user
  @param : client
  @return : string
*/


async function genID(client) {
  try {
    var text = "PTG";
    var result = await client.db("data").collection("uid").find({_id:0}).toArray();
    var id = parseInt( result[0].uid);
    id++;
    text = text + id;
    await client.db("data").collection("uid").updateOne({_id:0},{$set:{uid:id.toString()}});
  } catch (e) {
    console.log(e);
  }
  return text;
}

module.exports = genID;