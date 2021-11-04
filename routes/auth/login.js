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
      const token = jwt.sign({email: email}, process.env.JWT_SECRET);
      logintoken = token;
      console.log(logintoken);
    }else{
      message = "Bad Auth. Invalid Credentials";
    }
  } catch (error) {
    console.log(message);
    message = "Login Error"
  } finally{
    await client.close();
    res.send({message: message,token: logintoken});
  }
}

module.exports = login;