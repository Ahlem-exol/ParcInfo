const {
  DataTypes
} = require('sequelize');

const sequelize = require('../utils/database');
const Employee = require('./employee');
const Intervention = require('./intervention');
const Machine = require('./machine');

const Direction = sequelize.define(
  'direction',
  {
    idDir: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idDir"
    },
    nomDir: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nomDir"
    },
    numPost: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "numPost"
    },
    nbrEmp: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nbrEmp"
    },
    effectif: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "effectif"
    },
    nbrMachine: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nbrMachine"
    },
    nbrIntervention: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nbrIntervention"
    },
    UserPost: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "UserPost"
    },
    Emplacement: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Emplacement"
    }
  }, {  

    freezeTableName: true,
    timestamps: false
  }
  );
  
  Direction.hasMany(Employee);
  Employee.belongsTo(Direction, { targetKey: 'idDir', foreignKey: 'idDir' });
  
  Direction.hasMany(Machine);
  Machine.belongsTo(Direction, { targetKey: 'idDir', foreignKey: 'idDir' });

  Direction.hasMany(Intervention);
  Intervention.belongsTo(Direction, { targetKey: 'idDir', foreignKey: 'idDir' });


  module.exports = Direction;