const jwt = require('jsonwebtoken');
const RefreshToken = require('../../models/jwt/RefreshToken');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const refreshAccessToken = async (jwt_ref_token) => {
  const refreshToken = await RefreshToken.findOne({ token: jwt_ref_token });
  if(!refreshToken) return null;
  const payload = await jwt.verify(jwt_ref_token, JWT_REFRESH_SECRET);
  const tokenPayload = {
    userId: payload.userId
  };
  const newAccessToken = await jwt.sign(tokenPayload, JWT_ACCESS_SECRET);
  return newAccessToken;
}; 

const auth = async (req, res, next) => {
  const { jwt_acc_token, jwt_ref_token } = req.cookies;
  if(jwt_acc_token && jwt_ref_token) {
    try {
      const accTokenPayload = await jwt.verify(jwt_acc_token, JWT_ACCESS_SECRET);
      if(accTokenPayload) {
        req.user = {
          userId: userId
        };
        next();
      } else {
        try {
          const newAccessToken = await refreshAccessToken(jwt_ref_token);
          if(newAccessToken) {
            res.cookie('jwt_acc_token', newAccessToken, { httpOnly: true, expiresIn: '5m' });
            req.user = {
              userId: userId
            };
            next();
          } else {
            return res.status(401).json({ errorMsg: 'Authentication error' });
          }
        } catch (err) {
          return res.status(401).json({ errorMsg: 'Authentication error' });
        }
      }
    } catch (error) {
      return res.status(401).json({ errorMsg: 'Authentication error' });
    }
  }
};

module.exports = auth;