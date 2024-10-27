// sendEmail.js
const nodemailer = require("nodemailer");

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: '"Laib Clinque" laibclinque@gmail.com', // Sender address
      to,                                         // Recipient address
      subject,                                    // Subject line
      text,                                       // Plain text body
      html,                                       // HTML body
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

// Export the sendEmail function
module.exports = sendEmail;
