const { Sequelize, DataTypes, Model } = require('sequelize')

class UserEmailVerification extends Model {}

UserEmailVerification.init({
	id:{
		type:DataTypes.INTEGER, 
		allowNull: false,
		autoIncrement:true,
		primaryKey:true 

	}
	email:{
		type:DataTypes.STRING, 
		allowNull: false,
		unique: true
	}
	code:{
		type:DataTypes.STRING, 
		allowNull: false
	}
	expires:{
		type:DataTypes.DATE, 
		allowNull: false
	}
	isVerified:{
		type:DataTypes.BOOLEAN, 
		allowNull: false
	}
})
module.exports = UserEmailVerification;