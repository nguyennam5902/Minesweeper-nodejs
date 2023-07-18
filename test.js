const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
   service: 'gmail',
   auth: {
      user: 'nn1947338@gmail.com',
      pass: 'dfeyyiadenfryfrc'
   },
   tls: {
      rejectUnauthorized: false
   }
});
const mailOption = {
   from: 'nn1947338@gmail.com',
   to: 'nguyenhainam05092002@gmail.com',
   subject: 'TEST EMAIL',
   text: `Hi, I am making some strawberry cakes (for my husband but he said he is busy, so sad) and some chocolate cakes !
    If you have free time tomorrow's morning, come and have some cakes with me! You will definitely loved it!`
}
transporter.sendMail(mailOption, function (error, info) {
   if (error)
      throw error;
   else {
      console.log('email sent: ' + info.response);
   }
})