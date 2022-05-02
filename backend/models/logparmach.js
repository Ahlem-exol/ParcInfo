const {
    DataTypes
  } = require('sequelize');
  
  const sequelize = require('../utils/database');

  const Logparmach = sequelize.define(
    'logparmach',
    {
        idLPM: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: true,
        comment: null,
        field: "idLPM"
      },
      idMach: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "idMach",
        references: {
          key: "idMach",
          model: "machine_model"
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
      },
      dateInstallation: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "dateInstallation"
      },
      iduser: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "idUser",
        references: {
          key: "id",
          model: "user_model"
        }
      },
    }, {
  
      freezeTableName: true,
      timestamps: false
    }
    );
   
  
module.exports = Logparmach;
