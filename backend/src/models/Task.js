const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,   
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,          
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,          
  },
}, {
  tableName: "tasks",          
  timestamps: true,            
});

module.exports = Task;          
