const {
    DataTypes
  } = require('sequelize');

  const sequelize = require('../utils/database');
const Employee = require('./employee');
const Info_materiel = require('./info_materiel');
const Intervention = require('./intervention');
const Logiciel = require('./logiciel');
const Machine = require('./machine');

  const User = sequelize.define(
    'user',
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
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "name"
      },

      mail: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "mail"
      },
      password: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "password"
      },
 
   
  }, {
    freezeTableName: true,
    timestamps: false
  }
  );
  
User.hasMany(Employee);
Employee.belongsTo(User, { targetKey: 'id', foreignKey: 'idUser' });

  
User.hasMany(Machine);
Machine.belongsTo(User, { targetKey: 'id', foreignKey: 'idUser' });


User.hasMany(Intervention);
Intervention.belongsTo(User, { targetKey: 'id', foreignKey: 'iduser' });


User.hasMany(Info_materiel);
Info_materiel.belongsTo(User, { targetKey: 'id', foreignKey: 'iduser' });

User.hasMany(Logiciel);
Logiciel.belongsTo(User, { targetKey: 'id', foreignKey: 'iduser' });




  module.exports = User;