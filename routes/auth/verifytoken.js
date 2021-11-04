const jwt = require('jsonwebtoken');

async function verifytoken(req,res,next){
  var message = "";
  try{
  var token = req.body.token;
  const verify = jwt.verify(
    token,
    process.env.JWT_SECRET
  );
  message = "Token is valid";
  }
  catch(err){
    message= "Internal server error"
  }finally{
    res.json({
      message: message,
    });
  }
}

module.exports = verifytoken;