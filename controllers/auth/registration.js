const { User, UserEmailVerification } = require("../../models/user");
const { transporter } = require("../../email/config");
// modules
const moment = require('moment');
const bcrypt = require('bcrypt');
const validator = require('validator');
// utils
const { validationOptions } = require('../../utils/validation');

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

    const foundCode = await UserEmailVerification.findOne({ code: codeEncrypted });
    if(foundCode !== null) {
      if(foundCode.dataValues.isVerified) {
        return { isAlreadyVerified: true };
      }
      await foundCode.destroy();
    }
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

class UserRegistration {
  static registerNormalUser = async (fullName, email, phoneNumber, password) => {
    const passwordEncrypted = await bcrypt.hash(password, 12);
    const user = User.build({
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      password: passwordEncrypted,
      role: 'user',
      status: 'pending'
    });
    await user.save();
  }
}

class Registration {
  static validateRequest = (body) => {
    const { fullName, email, phoneNumber, password, confirmPassword } = body;
    if(fullName.length > 0 && password === confirmPassword) {
      if(validator.isEmail(email, validationOptions.email) && validator.isStrongPassword(password, validationOptions.password) && validator.isMobilePhone(phoneNumber)) {
        return true;
      }  
    }
    return false;
  }

  static init = async (req, res) => {
    const { fullName, email, phoneNumber, password, confirmPassword } = req.body;

    if(Registration.validateRequest(req.body)) {
      const code = VerificationCode.generateCode();
      try {
        await VerificationCode.sendVerificationCode(email, code);
        const msg = await VerificationCode.saveVerificationCode(email, code);
        if(msg && msg.isAlreadyVerified) return res.status(404).json({ errorMsg: 'User email already verified' });
      } catch (err) {
        const errorMsg = 'Failed to initialize registration. Internal server error.';
        res.status(500).json({ errorMsg });
        throw new Error(err);
      }
      return res.sendStatus(200);
    } else {
      const errorMsg = 'Failed to initialize registration. Validation error.';
      res.status(422).json({ errorMsg });
    }
  }

  static finish = async (req, res) => {
    const { fullName, email, phoneNumber, password, confirmPassword, verificationCode } = req.body;
    if(Registration.validateRequest(req.body)) {
      const emailVerification = await UserEmailVerification.findOne({ email: email });
      const isValid = await bcrypt.compare(verificationCode, emailVerification.dataValues.code);
      if(isValid) {
        emailVerification.isVerified = true;
        await emailVerification.save();
        try {
          await UserRegistration.registerNormalUser(fullName, email, phoneNumber, password);
          return res.sendStatus(200);
        } catch (error) {
          const errorMsg = 'Failed to initialize registration. Internal server error.';
          return res.status(500).json({ errorMsg });
        }
      } else {
        const errorMsg = 'Failed to finish registration. Invalid email verification code.'; 
        return res.status(406).json({ errorMsg });
      }
    } else {
      const errorMsg = 'Failed to finish registration. Validation error.';
      return res.status(422).json({ errorMsg });
    }
  }
} 


module.exports = Registration;