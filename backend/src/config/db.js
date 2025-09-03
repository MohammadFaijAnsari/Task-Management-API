const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("taskmanager", "root", "faij123", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
  logging: false,
});

module.exports = sequelize;
