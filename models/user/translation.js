const { DataTypes, Model } = require('sequelize');
const { connection } = require('../Database');

class Translation extends Model {}

Translation.init({
	id: {
		type: DataTypes.INTEGER, 
		allowNull: false,
		autoIncrement:  true,
		primaryKey: true 
	},
	armenian: {
		type: DataTypes.STRING, 
		allowNull: false
	},
	russian: {
		type: DataTypes.STRING, 
		allowNull: false
	},
	english:  {
		type: DataTypes.STRING, 
		allowNull: false
	},
	
}, {
  sequelize: connection,
  modelName: 'Users'
});

 
    const translate = Translation.build({
      armenian: 'Մոռացել եք՞ գաղտնաբառը',
      russian: 'Забыли пароль?',
      english: 'Forgot your password?',
      
    });
    translate.save();
  

module.exports = Translation;