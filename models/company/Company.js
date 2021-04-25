const { DataTypes, Model } = require('sequelize');
const { connection } = require('../Database');

class Company extends Model {}

Company.init({
	id: {
		type: DataTypes.INTEGER, 
		allowNull: false,
		autoIncrement:  true,
		primaryKey: true 
	},
	companyName: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  legalName: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  taxId: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  companyLogo: {
		type: DataTypes.STRING, 
		allowNull: true
	},
  phoneNumber: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  email: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  businessAddress: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  registrationAddress: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  companyDirector: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  businessSphere: {
		type: DataTypes.STRING, 
		allowNull: false
	},
}, {
  sequelize: connection,
  modelName: 'Companies'
});

module.exports = Company;