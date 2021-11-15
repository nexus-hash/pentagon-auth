const client = require('../../database/db');
const jwt = require('jsonwebtoken');
const sha256 = require('sha256');

/*
  @route POST /auth/login
  @desc Login user
  @access Public

  @body {
    email: String,
    password: String
  }

*/

async function login(req, res,next) {
  try {
    var message = "";
    var logintoken = "";
    var uname = "";
    var uid = "";
    await client.connect();
    const { email, password } = req.body;
    var result = await client.db('data')
    .collection('users')
    .find({ email: email}).toArray().catch(err => {
      console.log(err);
    });
    if(result.length === 0){
      message = "User not found";
    }
    else if(result[0].password === sha256(password)){
      message = "Login Successful";
      console.log(result[0]);
      const token = jwt.sign({email: email,password:result[0].password}, process.env.JWT_SECRET,{expiresIn: 60*60*24*3});
      logintoken = token;
      uid = result[0]._id
      uname = result[0].username;
    }else{
      message = "Bad Auth. Invalid Credentials";
    }
  } catch (error) {
    console.log(message);
    message = "Login Error"
  } finally{
    await client.close();
    res.send({message: message,token: logintoken,uname: uname,uid:uid});
  }
}

module.exports = login;