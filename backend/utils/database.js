const Sequelize = require('sequelize');

const sequelize = new Sequelize('alrimparc', 'root','root', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;
