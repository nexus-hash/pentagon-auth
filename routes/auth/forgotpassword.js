const client = require("../../database/db")
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
    if(await checkCode(req.body.email,req.body.code,client)){
      var updatePassword = await client.db("data").collection("users").updateOne({email:req.body.email},{$set:{password:req.body.password}})
      .catch(err => {
        message = "Error updating password"
      });
      console.log(updatePassword)
      if(updatePassword.acknowledged){
        message = "Password updated successfully"
        await resetCode(email,client);
      }
    }else{
      message = "Invalid Code";
    };
  } catch (error) {
    console.log(error);
  } finally{
    await client.close();
    res.send({message:message});
  }
}

module.exports = forgotPassword;