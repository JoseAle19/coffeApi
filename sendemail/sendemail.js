require("dotenv").config();

("use strict");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendEmailOrder = async (userEmail, userName, orderId) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "caffemorena2022@gmail.com", // generated ethereal user
      pass: process.env.KEY_SECRET_EMAIL, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"caffemorena2022@gmail.com"',
    to: userEmail, // list of receivers
    subject: "Pedido realizado", // Subject line
    text: `Gracias por tu compra ${userName}.
    Usted tiene tres dias para pasar por pedido
    Numero de pedido: ${orderId}
    ` // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

sendEmailOrder().catch(console.error);

module.exports = {
  sendEmailOrder,
};
