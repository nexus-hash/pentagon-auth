async function genTID(client) {
  try {
    var text = "PTGT";
    var result = await client
      .db("data")
      .collection("tid")
      .find({ _id: 0 })
      .toArray();
    var id = parseInt(result[0].tid);
    id++;
    text = text + id;
    await client
      .db("data")
      .collection("tid")
      .updateOne({ _id: 0 }, { $set: { tid: id.toString() } });
  } catch (e) {
    console.log(e);
  }
  return text;
}

module.exports = genTID;
