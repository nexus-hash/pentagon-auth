async function genPID(client) {
  try {
    var text = "PTGP";
    var result = await client
      .db("data")
      .collection("pid")
      .find({ _id: 0 })
      .toArray();
    var id = parseInt(result[0].pid);
    id++;
    text = text + id;
    await client
      .db("data")
      .collection("pid")
      .updateOne({ _id: 0 }, { $set: { pid: id.toString() } });
  } catch (e) {
    console.log(e);
  }
  return text;
}

module.exports = genPID;
