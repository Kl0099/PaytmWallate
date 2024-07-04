"use server";

import nodemailer from "nodemailer";
// import nodemailer from "nodemailer";
interface mailsender {
  number?: string;
  email: string;
  title: string;
  body: string;
}
const mailSender = async ({ email, number, title, body }: mailsender) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = transporter.sendMail({
      from: `"Paytm Wallet"`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    return info;
  } catch (error) {
    //@ts-ignore
    console.log(error.message);
    return error;
  }
};

export async function nodemailerEmailSending({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  try {
    let response = await mailSender({
      email: email,
      title: "Verification Email",
      body: `here your one time password ${otp}`,
    });
    console.log("Email sent successfully");
    return {
      success: true,
      message: "success",
    };
  } catch (error) {
    console.log("error ocuured while sending email", error);
    return {
      success: false,
      message: "error while sending email",
    };
  }
}
