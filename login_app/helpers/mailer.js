import nodemailer from "nodemailer"

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    //TODO:Configure mail for usage
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });
    const mailOptions = {
      from: '"Maddison Foo Koch 👻" Vignesh@gmail.com', // sender address
      to: email, // list of receivers
      subject:emailType ==="VERIFY"?"Verification of your email":"Reset your password", // Subject line
      html: "<b>Hello world?</b>", // html body
    }
    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse
  } catch (error) {
    throw new Error(error.message)
  }
}