const nodemailer = require("nodemailer");
const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: "onifadejohnson2022@gmail.com",
      pass: "mvceotlndyofzqae",
    },
  });

  const mailOptions = {
    from: "onifadejohnson2022@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;