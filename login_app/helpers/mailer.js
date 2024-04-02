import User from "@/models/userSchema";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    //TODO:Configure mail for usage
    const hashedToken = await bcrypt.hash(userId.toString(),10)
    if(emailType=="VERIFY"){
      await User.findByIdAndUpdate(userId,
        { $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry:Date.now()+ 3600000,

         }})
    }
    else if(emailType=="RESET"){
      await User.findByIdAndUpdate(userId,
        { $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry:Date.now()+ 3600000,
         }})
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f6907b48eb5403", //✖
        pass: "ad51a9ddcac05e" //✖
      }
    });
    const mailOptions = {
      from: '"Maddison Foo Koch 👻" Vignesh@gmail.com', // sender address
      to: email, // list of receivers
      subject:emailType ==="VERIFY"?"Verification of your email":"Reset your password", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/user/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/user/verifyemail?token=${hashedToken}
      </p>`,
      //TODO:add html for reset password too
    }
    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse
  } catch (error) {
    throw new Error(error.message)
  }
}