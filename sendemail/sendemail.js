require("dotenv").config();

("use strict");
const nodemailer = require("nodemailer");

const sendEmailOrder = async (userEmail, userName, orderId) => {
  
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
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
    html: `  <header style="  background-color: rgba(226, 162, 94, 0.861); text-align: center; width: 100%; ">
    <h1 style="color: rgb(128, 64, 0); font-family: fantasy; font-weight: normal;">Gracias por su compra </h1>
    <div style="height: 100px; width: 100px; margin: 0 auto;">
        <img style="object-fit: cover; height: 100%; width: 100%;"
            src="https://us.123rf.com/450wm/yurypenzin/yurypenzin2006/yurypenzin200600195/148549181-plantilla-de-dise%C3%B1o-de-logotipo-de-cafeter%C3%ADa-emblema-de-caf%C3%A9-retro-arte-vectorial-.jpg?ver=6"
            alt="Logo cafe">

    </div>
    <p style="font-family: Verdana, Geneva, Tahoma, sans-serif; margin: 4px;">Gracias por su compra, usted tiene
        tres dias para pasar por su pedido ${userName}</p>
    <p style="font-family: Verdana, Geneva, Tahoma, sans-serif; margin: 4px;">Tu numero de pedido es: <span
            style="font-weight: bold;">${orderId}</span></p>

    <a style=" display: inline-block; cursor: pointer; border-radius: 10px; padding: 5px; margin-top: 30px; background-color: rgb(179, 140, 82);
     text-decoration: none; color: white; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
        href="https://www.starbucks.com.mx/">Ir a tienda</a>
</header>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

// sendEmailOrder().catch(console.error);

module.exports = {
  sendEmailOrder,
};
