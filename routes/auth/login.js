const client = require('../../database/db');

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
    await client.connect();
    const { email, password } = req.body;
    var result = await client.db('data')
    .collection('users')
    .find({ email: email}).toArray().catch(err => {
      console.log(err);
    });
    if(result[0].password === password){
      message = "Login Successful";
    }else{
      message = "Bad Auth. Invalid Credentials";
    }
  } catch (error) {
    message = "Login Error"
  } finally{
    await client.close();
    res.send({message: message});
  }
}

module.exports = login;