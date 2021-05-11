const { Sequelize } = require('sequelize');

const { DB_HOST: host, DB_USER: username, DB_PASSWORD: password, DB_PORT: port, DB_DATABASE: database } = process.env; 

const seqConnection = new Sequelize(database, username, password, {
  dialect: 'mysql',
  host: host,
  port: port
});

const connect = async () => {
  try {
    await seqConnection.authenticate();
    await seqConnection.sync();
    console.log('Connection has been established successfully.')
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.connection = seqConnection;
module.exports.connect = connect;

