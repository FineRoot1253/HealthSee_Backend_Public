const dotenv = require("dotenv");

if (!process.env.MYSQL_HOST) {
  console.log(process.env.MYSQL_HOST);
  dotenv.config();
}

module.exports = {
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB,
  dialect: "mysql",
};
