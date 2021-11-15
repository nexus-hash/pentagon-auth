async function genFID(client) {
  try {
    var text = "PTGF";
    var result = await client
      .db("data")
      .collection("fid")
      .find({ _id: 0 })
      .toArray();
    var id = parseInt(result[0].fid);
    id++;
    text = text + id;
    await client
      .db("data")
      .collection("fid")
      .updateOne({ _id: 0 }, { $set: { fid: id.toString() } });
  } catch (e) {
    console.log(e);
  }
  return text;
}

module.exports = genFID;
