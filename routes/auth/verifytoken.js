const jwt = require('jsonwebtoken');

async function verifytoken(req,res,next){
  try{
  var token = req.body.token;
  console.log(token);
  const verify = jwt.verify(
    token,
    process.env.JWT_SECRET
  );
  console.log(verify);
  res.json({
    message: 'Token is valid'
  })
  }
  catch(err){
    res.json({
      message: "Internal server error"
    });
  }
}

module.exports = verifytoken;