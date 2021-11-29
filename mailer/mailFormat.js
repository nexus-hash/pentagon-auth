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

function mailMessageForNewTask(date,title,team,progress){
  return "<div style='width: 36rem;'>"+
          "<div style='background-color: #EB5757; color: aliceblue;display: flex;justify-content: start;align-items: flex-start;height: auto;padding-top: 2rem;padding-left: 1rem;padding-bottom: 2px;'>"+
          "<h1 style='color: white;'>New Task Assigned</h1>"+
          "</div><div><p>Hey,</p><p style='text-align: justify;text-justify: inter-word;'>You have been assigned a new task in the "+team+". The task details are given below</p>"+
          "<div style='width: inherit;align-items: center;justify-content: center;display: flex;'>"+
          "<div style='padding-top: 0.3rem; padding-left: 1.5rem; padding-bottom: 1rem;justify-content: space-between; flex-direction: column; padding-right: 1.5rem; display: flex; align-items: flex-start; width:16rem; height:16rem; border-radius: 10px; box-shadow: 5px; background-image: linear-gradient(to bottom right,#3a7ff6,#2a67ec);'>"+
          "<p style='color: white;'>"+date+"</p><p style='color: white; font: bold; font-size: 2rem;'>"+title+"</p>"+
          "<div style='background-color: #2c5282; border-radius: 10px; width: 100%;'>"+
          `<div style='background-color: white; border-radius: 10px; height: 0.5rem; width: ${progress+'%'}'></div>`+
          "</div></div></div></div></div></div>";
}

module.exports = {mailMessage, mailMessageForNewTask};