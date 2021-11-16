const {
    DataTypes
  } = require('sequelize');
  
  const sequelize = require('../utils/database');
  const Employee = require('./employee');
  const Intervention = require('./intervention');
  
  const Logparinter = sequelize.define(
    'logparinter',
    {
        id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "id"
      },
      idInterv: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "idInterv",
        references: {
          key: "idInterv",
          model: "intervention_model"
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
   
  
    module.exports = Logparinter;
