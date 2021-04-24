const { User, UserEmailVerification } = require("../../models/user");
const { transporter } = require("../../email/config");
// moment 
const moment = require('moment');
// bcrypt
const bcrypt = require('bcrypt');

// validation regex
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g; 

class VerificationCode {

  static generateCode = () => {
    let code = '';
    for(let i = 0; i < 6; i++) {
      code += `${Math.ceil(Math.random() * 10) - 1}`;
    }
    return code;
  }

  static sendVerificationCode = async (email, code) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Loyalty | Verify your account',
      text: `Verify your email with this code: <${code}> \n The code will expire in 5 minutes`
    }
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      throw new Error(err);
    }
  }

  static saveVerificationCode = async (email, code) => {
    const codeEncrypted = await bcrypt.hash(code, 12);
    const time5minsLater = moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    const verificationCode = UserEmailVerification.build({
      email: email,
      code: codeEncrypted,
      expires: time5minsLater,
      isVerified: false
    });
    try {
      await verificationCode.save();
    } catch (err) {
      throw new Error(err);
    }
  }
}

class Registration {

  static init = async (req, res) => {
    const {fullName, email, phoneNumber, password, confirmPassword} = req.body;
    console.log(`${fullName}, ${email}, ${phoneNumber}, ${password}, ${confirmPassword}`);

    if(fullName.length > 0 && password === confirmPassword) {
      // if(emailRegex.test(email) && passwordRegex.test(password) && phoneNumberRegex.test(phoneNumber)) {
        const code = VerificationCode.generateCode();
        try {
          await VerificationCode.sendVerificationCode(email, code);
          await VerificationCode.saveVerificationCode(email, code);
        } catch (err) {
          const errorMsg = 'Failed to initialize registration. Internal server error.';
          res.status(500).json({ errorMsg });
          throw new Error(err);
        }
        res.sendStatus(200);
        return;
      // }  
    }
    const errorMsg = 'Failed to initialize registration. Validation error.';
    res.status(422).json({ errorMsg });
  }

  static finish = async (req, res) => {

  }
} 


module.exports = Registration;