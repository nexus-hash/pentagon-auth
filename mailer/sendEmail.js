const transport = require("./mail-config"); 
function sendEmail(to, subject, message) {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to,
    subject,
    html: message,
  };
  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = sendEmail;