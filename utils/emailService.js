const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
 


async function sendVerificationCode(toEmail, code) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "EquiTask 2FA Verification Code",
      text: `Your verification code is: ${code}\nThis code expires in 10 minutes.`,
    });
 
    return { success: true };
  } catch (err) {
    console.error("Email send error:", err.message);
    return { success: false, error: err.message };
  }
}
 


async function sendResetPasswordEmail(toEmail, resetUrl) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "EquiTask AI Password Reset",
      html: `
        <div style="font-family: Arial; line-height: 1.6;">
          <h2>Reset Your Password</h2>
          <p>You requested a password reset.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}" 
             style="display:inline-block;
                    padding:10px 15px;
                    background:#111;
                    color:#fff;
                    text-decoration:none;
                    border-radius:6px;">
            Reset Password
          </a>
          <p>This link expires in 15 minutes.</p>
          <p>If you didn’t request this, ignore this email.</p>
        </div>
      `,
    });
 
    return { success: true };
  } catch (err) {
    console.error("Reset email send error:", err.message);
    return { success: false, error: err.message };
  }
}
 
 
module.exports = { sendVerificationCode, sendResetPasswordEmail };
