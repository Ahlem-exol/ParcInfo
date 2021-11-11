const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idInfoR: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idInfoR"
    },
    IPadress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "IPadress"
    },
    nomMach: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nomMach"
    },
    sessionLocal: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sessionLocal"
    },
    mdpsSessionLocal: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mdpsSessionLocal"
    },
    sessionReseau: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sessionReseau"
    },
    outlook: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "outlook"
    },
    observation: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "observation"
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
    tableName: "info_reseau",
    comment: "",
    indexes: [{
      name: "idMach",
      unique: false,
      type: "BTREE",
      fields: ["idMach"]
    }]
  };
  const InfoReseauModel = sequelize.define("info_reseau_model", attributes, options);
  return InfoReseauModel;
};