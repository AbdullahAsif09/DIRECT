const nodemailer = require("nodemailer");
var handlebars = require("handlebars");
const path = require("path");
var fs = require("fs");

/* paths */
const templatePath = path.resolve(__dirname, "../../templates/email.html");
const emailTemplateSource = fs.readFileSync(templatePath, "utf8");
const template = handlebars.compile(emailTemplateSource);

const { createToken } = require("../createhashtoken");

/* create transporter object */
const Transporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
    tls: { rejectUnauthorized: false },
  });
};

/* get Host */
const getHost = () => {
  const HOST = process.env.HOST;
  const HOST_PROD = process.env.HOSTURL_PROD;
  const HOSTURL_LOCAL = process.env.HOSTURL_LOCAL;
  const HOSTURL = HOST === "PROD" ? HOST_PROD : HOSTURL_LOCAL;
  return HOSTURL;
};

/* mail sendin logic */
const sendEmail = async (mailOptions) => {
  const transporter = Transporter();
  await transporter.verify();
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) throw new Error(err);
  });
};

const createEmailOptions = ({ to, subject, templateData }) => {
  const htmlToSend = template(templateData);
  return {
    from: `${process.env.EMAIL_ADDRESS}`,
    to,
    subject,
    html: htmlToSend,
  };
};

exports.emailVerification = async (user, res, modelType = "account") => {
  // Extract account details from user object
  const account = user?.account ? user?.account : user;

  // Generate verification token
  const HOSTURL = getHost();
  const token = await createToken({
    _id: user?._id,
    name: account?.name,
  });

  // Construct verification link
  const link = `${HOSTURL}/api/${modelType}/verify?verificationToken=${token}&token=${user._id}`;

  // Prepare email content and options
  const emailContent = signupVerification({ link, name: account.name });
  const mailOptions = createEmailOptions({
    to: account.email, // Assuming email is stored in user account
    subject: emailContent.title,
    templateData: emailContent,
  });

  // Update user account verification status and send email
  account.verification = {
    token,
    verified: false,
    tokenUsed: false,
  };

  await sendEmail(mailOptions, res); // Assuming sendEmail returns a promise
  await user.save(); // Save user with updated verification token
};

exports.sendForgotPasswordOtpEmail = async (user, res) => {
  // Extract account details from user object
  const account = user?.account;

  // Prepare email content and options
  var otp = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const expiration_time = new Date(now.getTime() + 10 * 60000);

  user.account.otp.number = otp;
  user.account.otp.expiry = expiration_time;

  const emailContent = forgotpassword({ name: account.name, otp });
  const mailOptions = createEmailOptions({
    to: account.email, // Assuming email is stored in user account
    subject: emailContent.title,
    templateData: emailContent,
  });

  await sendEmail(mailOptions); // Assuming sendEmail returns a promise

  await user.save(); // Save user with updated verification token
};

exports.adminVerification = async (user, res) => {
  try {
    // Extract account details from user object
    const account = user;
    const now = new Date();
    const expiration_time = new Date(now.getTime() + 10 * 60000);
    var otp = Math.floor(1000 + Math.random() * 9000);

    user.temporarycodeOTP.code = otp;
    user.temporarycodeOTP.expireTime = expiration_time;

    // Prepare email content and options
    const emailContent = loginVerification({ name: account.name, otp });
    const mailOptions = createEmailOptions({
      to: account.email, // Assuming email is stored in user account
      subject: emailContent.title,
      templateData: emailContent,
    });

    await sendEmail(mailOptions, res); // Assuming sendEmail returns a promise
    await user.save(); // Save user with updated verification token
  } catch (error) {
    console.error("Error while sending otp:", error);
    return res.status(500).json({ type: "failure", result: error.message });
  }
};

/*  */
exports.emailVerified = async (user, res) => {
  // Extract account details from user object
  const account = user?.account;

  // Construct verification link

  // Prepare email content and options
  const emailContent = accountVerified({ name: account.name });
  const mailOptions = createEmailOptions({
    to: account.email, // Assuming email is stored in user account
    subject: emailContent.title,
    templateData: emailContent,
  });

  await sendEmail(mailOptions, res); // Assuming sendEmail returns a promise
  await user.save(); // Save user with updated verification token
};

const signupVerification = ({ name, link }) => {
  return {
    title: "Account Verification",
    body: `Hi ${name}, use the following Link to complete your account signup process on DIRECT Portal`,
    footer:
      "You received this email because you signed up for a new account. If you didn't request this, you can safely delete this email.",
    link,
    name,
  };
};

const loginVerification = ({ name, otp }) => {
  return {
    title: "Login Verification OTP",
    body: `Hi ${name}, use the following OTP to verify your login. OTP is valid for 1 minute.`,
    footer:
      "You received this email because there was a login attempt to your account. If you didn't request this, you can safely delete this email.",
    otp,
    name,
  };
};
const forgotpassword = ({ name, otp }) => {
  return {
    title: "Account Verification OTP",
    body: `Hi ${name}, use the following OTP to verify your account. OTP is valid for 1 minute.`,
    footer:
      "You received this email because there was a verification attempt to your account. If you didn't request this, you can safely delete this email.",
    otp,
    name,
  };
};

const accountVerified = ({ name, link = null }) => {
  return {
    title: "Account Verified",
    body: `Congratulations ${name}! Your account has been successfully verified. You can now log in and start using our services.`,
    footer:
      "Thank you for verifying your account. If you have any questions, please contact our support team.",
    link: link ?? "http://89.116.32.31:5500/login",
  };
};
