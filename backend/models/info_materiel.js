const {
  DataTypes
} = require('sequelize');
const sequelize = require('../utils/database'); 
const Info_materiel = sequelize.define(
  'info_materiel',
  {

    idInfoM: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idInfoM"
    },
    RAM: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "RAM"
    },
    Processor: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Processor"
    },
    CarteGraphique: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CarteGraphique"
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
     idUser: {
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


  module.exports = Info_materiel;