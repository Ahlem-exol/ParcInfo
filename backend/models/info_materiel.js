const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idInfoM: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idInfoM"
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "type"
    },
    mark: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mark"
    },
    otherCar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "otherCar"
    },
    descreption: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descreption"
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
    }
  };
  const options = {
    tableName: "info_materiel",
    comment: "",
    indexes: [{
      name: "idMach",
      unique: false,
      type: "BTREE",
      fields: ["idMach"]
    }]
  };
  const InfoMaterielModel = sequelize.define("info_materiel_model", attributes, options);
  return InfoMaterielModel;
};