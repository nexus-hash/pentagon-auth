const client = require("../../database/db");

async function signup(req, res, next) {
  var message = "";
  try {
    await client.connect();
    var result = await client
      .db("event")
      .collection("users")
      .find({
        email: req.body.email,
      })
      .count();
    if (result > 0) {
      message = "Email already exists";
    } else {
      var result = await client.db("event").collection("verification").find({
        email: req.body.email,
      });
      if (result.verificationCode == req.body.verificationCode) {
        var result = await client.db("event").collection("users").insertOne({
          _id: createId(),
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        message = "User created successfully";
      } else {
        message = "Verification code is incorrect";
      }
      var result = await client
        .db("event")
        .collection("users")
        .insertOne(req.body);
      message = "Successfully signed up";
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
  res.send(message);
}
