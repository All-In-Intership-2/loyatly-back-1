const { DataTypes, Model } = require('sequelize');
const { connection } = require('../Database');
const { Company } = require('../company');
const { User } = require('../user');

class Employee extends Model {}

Employee.init({
	id: {
		type: DataTypes.INTEGER, 
		allowNull: false,
		autoIncrement:  true,
		primaryKey: true 
	},
	userId: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  companyId: {
		type: DataTypes.STRING, 
		allowNull: false
	},
  role: {
		type: DataTypes.STRING, 
		allowNull: false
	}
}, {
  sequelize: connection,
  modelName: 'Employees'
});

Employee.belongsTo(User, { foreignKey: 'userId' });
Employee.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Employee;