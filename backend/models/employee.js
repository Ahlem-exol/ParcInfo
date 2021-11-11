const {
  DataTypes
} = require('sequelize');

const sequelize = require('../utils/database');
const Intervention = require('./intervention');
const Machine = require('./machine');
const Employee = sequelize.define(
  'employee',
  {
    idEmp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idEmp"
    },
    nomEmp: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nomEmp"
    },
    prenomEmp: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "prenomEmp"
    },
    dateNaiss: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dateNaiss"
    },
    post: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "post"
    },
    numTele: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "numTele"
    },
    mailEmp: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mailEmp"
    },
    numPost: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "numPost"
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
    matricule: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "matricule"
    },
    adresse: {
      type: DataTypes.STRING(225),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "adresse"
    } 
}, {
  freezeTableName: true,
  timestamps: false
}
);

Employee.hasMany(Machine);
Machine.belongsTo(Employee, { targetKey: 'idEmp', foreignKey: 'idEmp' });

Employee.hasMany(Intervention);
Intervention.belongsTo(Employee, { targetKey: 'idEmp', foreignKey: 'idEmp' });



module.exports = Employee;