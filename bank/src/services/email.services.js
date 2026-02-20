const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

async function createTransporter() {
  const accessToken = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });
}

async function sendEmail(to, subject, text, html) {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"Backend" <${process.env.EMAIL_USER}>`,
      to, subject, text, html,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
}

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Backend";
  const text = `Hello ${name}, you have successfully registered.`;
  const html = `
        <h2>Welcome ${name} </h2>
        <p>You have successfully registered on our backend system.</p>
    `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const subject = 'Transaction Successful!';
  const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}
async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = 'Transaction Failed';
  const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}
module.exports = { sendRegistrationEmail, sendTransactionFailureEmail, sendTransactionEmail };
