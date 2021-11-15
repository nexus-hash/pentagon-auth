function get4(){
  var tokens = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "0","1","2","3","4","5","6","7","8","9"];
  var token = "";
  for(var i = 0; i < 4; i++){
    token += tokens[Math.floor(Math.random() * tokens.length)];
  }
  return token;
}

function genjoinId(){
  var joinId = get4()+"-"+get4()+"-"+get4();
  return joinId;
}

module.exports = genjoinId;