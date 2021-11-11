const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idContact: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idContact"
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nom"
    },
    prenom: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "prenom"
    },
    telphone: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "telphone"
    },
    fonctionCon: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "fonctionCon"
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mail"
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "adresse"
    },
    idForniss: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idForniss",
      references: {
        key: "idForniss",
        model: "fournisseur_model"
      }
    }
  };
  const options = {
    tableName: "contact",
    comment: "",
    indexes: [{
      name: "idForniss",
      unique: false,
      type: "BTREE",
      fields: ["idForniss"]
    }]
  };
  const ContactModel = sequelize.define("contact_model", attributes, options);
  return ContactModel;
};