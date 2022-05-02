const {
  DataTypes
} = require('sequelize');

const sequelize = require('../utils/database');
const Employee = require('./employee');
const Logpardir = require('./logpardir');
const Logparinter = require('./logparinter');
const Logparmach = require('./logparmach');
const Intervention = require('./intervention');

const Logiciel = sequelize.define(
  'logiciel',
  {
    idLog: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idLog"
    },
    nomLog: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nomLog"
    },
    owner: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "owner"
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "logo"
    },

    versionLog: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "versionLog"
    },
    Licence: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Licence"
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "type"
    },
    comptabilite: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "comptabilite"
    },

  
    observation: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "observation"
    },
    idForniss: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idForniss",
      references: {
        key: "idForniss",
        model: "fournisseur_model"
      }
    },
    lienTelechr: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "lienTelechr"
    },   iduser: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "iduser",
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

  
  Logiciel.hasMany(Logpardir);
  Logpardir.belongsTo(Logiciel, { targetKey: 'idLog', foreignKey: 'idLog' });


  Logiciel.hasMany(Logparinter);
  Logparinter.belongsTo(Logiciel, { targetKey: 'idLog', foreignKey: 'idLog' });

  Logiciel.hasMany(Logparmach);
  Logparmach.belongsTo(Logiciel, { targetKey: 'idLog', foreignKey: 'idLog' });


  Logiciel.hasMany(Intervention);
  Intervention.belongsTo(Logiciel, { targetKey: 'idLog', foreignKey: 'idLog' });

  

  module.exports = Logiciel;