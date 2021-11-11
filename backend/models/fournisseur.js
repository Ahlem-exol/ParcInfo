const {
  DataTypes
} = require('sequelize');

const sequelize = require('../utils/database');
const Logiciel = require('./logiciel');
const Machine = require('./machine');
const Fournisseur = sequelize.define(
  'fournisseur',
  {
    idForniss: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idForniss"
    },
    nomFourni: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nomFourni"
    },
    Adresse: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Adresse"
    }
  }, {
    freezeTableName: true,
    timestamps: false
  }
  );
  
  Fournisseur.hasMany(Machine);
  Machine.belongsTo(Fournisseur, { targetKey: 'idForniss', foreignKey: 'idForniss' });
  
  
  Fournisseur.hasMany(Logiciel);
  Logiciel.belongsTo(Fournisseur, { targetKey: 'idForniss', foreignKey: 'idForniss' });

  
  module.exports = Fournisseur;