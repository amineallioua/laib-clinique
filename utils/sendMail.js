const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const sendEmail = (body) => {
    
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services like Yahoo, Outlook, etc.
    auth: {
      user: process.env.Mail_sender, // Replace with your email
      pass: process.env.Mail_sender_Pwd, // Replace with your email password or app password
    },
  });
  

  // Email options
  const mailOptions = {
    from: process.env.Mail_sender, // Sender address
    to: process.env.Mail_reciver, // List of recipients
    subject: 'New Notification Arrived', // Subject line
    text: body, // Plain text body of the email
    html: `<p>${body}</p>` // HTML version of the body, if needed
  };

  // Send email with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = sendEmail;
