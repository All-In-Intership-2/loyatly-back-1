const User = require("../../models/user/User.js");
const UserEmailVerification = require("../../models/user/UserEmailVerification.js");

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g ; 


class Registration {
  static init = async (req, res) => {

	const {fullName, email, phoneNumber, password, confirmPassword} = req.body ;
     if (fullName.length>0 && password === confirmPassword){
     	if(emailRegex.test(email) && passwordRegex.test(password) && phoneNumberRegex.test(phoneNumber)){
     		
     	}
    
    } 


    


  }

  static finish = async (req, res) => {

  }
} 


module.exports = Registration;