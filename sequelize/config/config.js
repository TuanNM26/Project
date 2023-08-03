require('dotenv').config();
const schemaConfig = require(__dirname + '/schema.js');

module.exports = {
  development: {
    username: 'quiz_practice',
    password: 'quiz_practice',
    database: 'quiz_practice',
    port: 3308,
    host: '127.0.0.1',
    dialect: 'mysql',
    schema: schemaConfig.name,
  },
};
