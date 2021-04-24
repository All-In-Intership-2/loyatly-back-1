const { DataTypes, Model } = require('sequelize');
const { connection } = require('../Database');

class UserEmailVerification extends Model {}

UserEmailVerification.init({
	id: {
		type: DataTypes.INTEGER, 
		allowNull: false,
		autoIncrement: true,
		primaryKey: true 
	}, 
	email: {
		type: DataTypes.STRING, 
		allowNull: false,
		unique: true
	},
	code: {
		type: DataTypes.STRING, 
		allowNull: false
	},
	expires: {
		type: DataTypes.DATE, 
		allowNull: false
	},
	isVerified: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, {
  sequelize: connection,
  modelName: 'UserEmailVerifications'
});

module.exports = UserEmailVerification;
