/* 
  @desc: Function to reset provided verification code
  @params: email, client
  @return: void
*/

async function resetCode(email,client) {
  try{
    const reset = await client.db('data')
    .collection('verification')
    .updateMany({email:email},{$set:{code:0}})
  }catch(error){
    console.log(error)
  } finally{
    return;
  }
}

module.exports = resetCode;