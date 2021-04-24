const { DataTypes, Model } = require('sequelize');
const { connection } = require('../Database');

class User extends Model {}

User.init({
	id: {
		type: DataTypes.INTEGER, 
		allowNull: false,
		autoIncrement:  true,
		primaryKey: true 
	},
	fullName: {
		type: DataTypes.STRING, 
		allowNull: false
	},
	email: {
		type: DataTypes.STRING, 
		allowNull: false
	},
	phoneNumber:  {
		type: DataTypes.STRING, 
		allowNull: false
	},
	password: {
		type: DataTypes.STRING, 
		allowNull: false
	},
	role: {
		type: DataTypes.ENUM("admin","user"), 
		allowNull: false
	},
	status: {
		type: DataTypes.ENUM("active","passive","pending"), 
		allowNull: false
	}
}, {
  sequelize: connection,
  modelName: 'Users'
});

module.exports = User;
