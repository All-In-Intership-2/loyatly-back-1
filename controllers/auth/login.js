const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models/user');
const { RefreshToken } = require('../../models/jwt');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if(foundUser) {
    const isTruePassword = await bcrypt.compare(password, foundUser.dataValues.password);
    if(isTruePassword) {
      const tokenPayload = {
        userId: foundUser.dataValues.id
      };
      const accessToken = jwt.sign(tokenPayload, JWT_ACCESS_SECRET);
      const refreshToken = jwt.sign(tokenPayload, JWT_REFRESH_SECRET);
      res.cookie('jwt_acc_token', accessToken, { expiresIn: '5m', httpOnly: true });
      res.cookie('jwt_ref_token', refreshToken, { httpOnly: true });
      await RefreshToken.create({ token: refreshToken });
      return res.status(200).send();
    } else {
      const errMsg = 'Authentication error: no user with the given email or password';
      return res.status(404).json({ errMsg });
    }
  } else {
    const errMsg = 'Authentication error: no user with the given email or password';
    return res.status(404).json({ errMsg });
  }
};

module.exports = login;