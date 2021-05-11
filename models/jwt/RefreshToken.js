const { DataTypes, Model } = require('sequelize');
const { connection } = require('../Database');

class RefreshToken extends Model {}

RefreshToken.init({
	id: {
		type: DataTypes.INTEGER, 
		allowNull: false,
		autoIncrement:  true,
		primaryKey: true 
	},
	token: {
		type: DataTypes.STRING, 
		allowNull: false,
    unique: true
	}
}, {
  sequelize: connection,
  modelName: 'jwtRefreshTokens'
});

module.exports = RefreshToken;