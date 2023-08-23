const { Sequelize } = require("sequelize");
const database = require("../database");

const Vehicle = database.define(
  "vehicle",
  {
    vehicle_num: { type: Sequelize.STRING },
    owner_num: { type: Sequelize.STRING },
    entry_time: { type: Sequelize.TIME },
    exit_time: { type: Sequelize.TIME },
  },
  {
    timestamps: false,
  }
);

module.exports = Vehicle;
