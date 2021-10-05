const client = require("../../database/db");
const mailMessage = require("../../mailer/mailFormat");
const sendEmail = require("../../mailer/sendEmail");

/* 
  @route POST /auth/sendCode
  @desc Send verification code to user

  @body {
    email: string
    type: string (optional)
  }
*/

async function sendCode(req, res, next) {
  try {
    await client.connect();
    const email = req.body.email;
    const type = req.body.type;
    var result = await client
      .db("data")
      .collection("verification")
      .find({ email: email })
      .count();
      if(type=="signup"){
    var checkUser = await client
      .db("data")
      .collection("users")
      .find({ email: email })
      .count();}
    var code = Math.floor(Math.random() * (999999 - 100000+1) + 100000);
    var message = "";
    var mailmessage = mailMessage(code,req.body.need);
    var subject = "6 Digit Verification Code";
    if (type == "signup" && checkUser != 0) {
      message = "User with the email already exists";
    } else if (result == 0) {
      var result2 = await client
        .db("data")
        .collection("verification")
        .insertOne({ email: email, code: code });
      if (result.acknowledged) {
        message = "Code sent successfully";
        sendEmail(email, subject, mailmessage);
      }
    } else {
      var result = await client
        .db("data")
        .collection("verification")
        .updateOne({ email: email }, { $set: { code: code } });
      if (result.acknowledged) {
        message = "Code sent successfully";
        sendEmail(email, subject, mailmessage);
      }
    }
    // ToDo: Send Code via mail
  } catch (error) {
    console.log(error);
    message = "Error in sending code";
  } finally {
    await client.close();
  }
  console.log(message);
  res.send({ message: message });
}

module.exports = sendCode;