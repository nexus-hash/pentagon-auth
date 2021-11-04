const client = require("../../database/db")
const sha256 = require('sha256');
var checkCode = require("./checkCode")
var resetCode = require("./resetCode")

/* 
  @route POST /auth/forgotpassword
  @desc Forgot Password

  @body{
    email: String
    code: String
    password: String
  }

*/


async function forgotPassword(req,res,next) {
  try {
    await client.connect();
    var email = req.body.email;
    console.log(email)
    console.log(req.body.password)
    if(await checkCode(req.body.email,req.body.code,client)){
      var updatePassword = await client.db("data").collection("users").updateOne({email:req.body.email},{$set:{password:sha256(req.body.password)}})
      .catch(err => {
        console.log(err)
        message = "Error updating password"
      });
      console.log(updatePassword.acknowledged)
      if(updatePassword){
        message = "Password updated successfully"
      }
      await resetCode(email,client);
    }else{
      message = "Invalid Code";
    };
  } catch (error) {
    message = "Error updating password"
    console.log(error);
  } finally{
    await client.close();
    console.log(message)
    res.send({message:message});
  }
}

module.exports = forgotPassword;