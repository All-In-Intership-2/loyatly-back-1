const nodemailer = require('nodemailer');

const { EMAIL_HOST: host, EMAIL_NAME: name, EMAIL_PORT: port, EMAIL_USER: user, EMAIL_PASS: password } = process.env;

const transporter = nodemailer.createTransport({
  host: host,
  name: name,
  port: port,
  auth: {
    user: user,
    pass: password
  }
});


module.exports.transporter = transporter;