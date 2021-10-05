const client = require("../../database/db");
const sendEmail = require("../../mailer/sendEmail");
const checkCode = require("./checkCode");
const genID = require("./genid");
const resetCode = require("./resetCode");

/*
  @route POST /auth/signup
  @desc Signup a new user

  @body {
    username: String,
    email: String,
    password: String,
    name: String,
    code: String
  }
*/

function mailForSignup(name) {
  return (
    "<div style='width: 36rem;'>" +
    "<div style='background-color: #EB5757; color: aliceblue;display: flex;justify-content: start;align-items: flex-start;height: auto;padding-top: 2rem;padding-left: 1rem;padding-bottom: 2px;'>" +
    "<h1 style='color: white;'>Pentagon Notifications</h1></div>" +
    "<div><p>Hey " +
    name +
    ",</p>" +
    "<p>Welcome to Pentagon. Your signup is sucessful. Login and continue using our app.</p>"
  );
}

async function signup(req, res, next) {
  var message = "";
  try {
    await client.connect();
    var checkAvail = await client
    .db("data")
    .collection("users")
    .find({ email: req.body.email })
    .count();
    if(checkAvail > 0){
      message = "User already Signed Up";
    }else{
    if (await checkCode(req.body.email, req.body.code,client)) {
      var userID = await genID(client);
      var result = await client
        .db("data")
        .collection("users")
        .insertOne({
          _id: userID,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
        })
        .catch((err) => {
          message = "Error Signing Up";
        });
      message = "Successfully Signed Up";
      var mailhtml = mailForSignup(req.body.name);
      sendEmail(req.body.email, "Welcome to Pentagon", mailhtml);
      await resetCode(req.body.email, client);
    } else {
      message = "Invalid Code";
    }
  }
  } catch (error) {
    message = "Error signing up";
  } finally {
    await client.close();
  }
  res.send({ message: message });
}

module.exports = signup;
