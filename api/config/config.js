const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  username_mongo: process.env.USERNAME_MONGO,
  password_mongo: process.env.PASSWORD_MONGO,
  port: process.env.PORT,
};