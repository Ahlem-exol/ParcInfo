const {
  DataTypes
} = require('sequelize');

const sequelize = require('../utils/database');
const Employee = require('./employee');
const Intervention = require('./intervention');

const Logpardir = sequelize.define(
  'logpardir',
  {
    idLpd: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idLpd"
    },
    idDir: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idDir",
      references: {
        key: "idDir",
        model: "direction_model"
      }
    },
    idLog: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idLog",
      references: {
        key: "idLog",
        model: "logiciel_model"
      }
    }
  }, {

    freezeTableName: true,
    timestamps: false
  }
  );
 

  module.exports = Logpardir;