const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("plms", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
