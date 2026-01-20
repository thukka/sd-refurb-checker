import { Resend } from "resend";

// Send email using Resend
const sendEmail = () => {
  console.log("Sending email...");

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    resend.emails.send({
      from: process.env.EMAIL_FROM ?? "",
      to: process.env.EMAIL_TO ?? "",
      subject: process.env.EMAIL_SUBJECT ?? "",
      html: process.env.EMAIL_BODY ?? "",
    });
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export default sendEmail;
