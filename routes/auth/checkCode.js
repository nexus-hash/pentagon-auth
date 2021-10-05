/* 
  @desc: check the validity of the verification code
  @param: email, code, client
  @return: boolean
*/

async function checkCode(email,code,client) {
  try{
    var result = await client
      .db("data")
      .collection("verification")
      .find({
        email: email,
      })
      .toArray();
      console.log(code);
      console.log(result[0].code);
    if(result[0].code.toString() === code){
      var match = true;
    }else{
      var match = false;
    }
  } catch(err) {
    return false;
  }finally{
    console.log(match);
    return match;
  }
}

module.exports = checkCode;