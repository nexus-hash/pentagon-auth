function mailMessage(code,message){
  return "<div style='width: 36rem;'>" +
      "<div style='background-color: #EB5757; color: aliceblue;display: flex;justify-content: start;align-items: flex-start;height: auto;padding-top: 2rem;padding-left: 1rem;padding-bottom: 2px;'>" +
      "<h1 style='color: white;'>mpm Verification Code</h1></div>" +
      "<div><p>Hey,</p>" +
      "<p style='text-align: justify;text-justify: inter-word;'>We recieved a request that you "+message+" for which you need a verification code use this 6 digit verification code for the same purpose. Your verification Code is :</p>" +
      "<div style='width: inherit;align-items: center;justify-content: center;display: flex;letter-spacing: 8px;'>" +
      "<div style='font-size: x-large;font-weight: bold;'>"+code+"</div></div>" +
      "<br></br>" +
      "<p style='text-align: justify;text-justify: inter-word;'>If you did not request this code, it is possible that someone else is trying to access your Pentagon account and making this request if so <b>do not share this code to anyone</b></p></div></div>";
}

module.exports = mailMessage;