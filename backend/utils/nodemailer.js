const nodemailer = require('nodemailer');
require('dotenv').config();

const EMAILADMIN = process.env.EMAILADMIN;
const EMAILUSERNAME = process.env.EMAILUSER;
const EMAILPASSWORD = process.env.EMAILPASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAILADMIN,
    pass: EMAILPASSWORD,
  }
});

function sendEmailNotification(userEmail) {
  const mailOptions = {
    from: EMAILADMIN,
    to: EMAILUSERNAME,
    subject: 'New User Registration',
    text: `A new user has registered with the Orkin Sales Inspector CMS, email is ${ userEmail }. Please approve at soonest availability.`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending email:', err);
    } else {
      console.log('Email sent:' + info.response);
    }
  });
}

module.exports = { sendEmailNotification };
