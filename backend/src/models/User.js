const { DataTypes, INET } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id:{
    type:DataTypes.INET,
    autoIncrement:true,
    primaryKey:true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  role:{
   type:DataTypes.ENUM('Admin','User'),
   defaultValue:"User",
   allowNull:false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
