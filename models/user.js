'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
  	login:{
	   type:DataTypes.STRING,
       primaryKey: true
  	},
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
	  tableName:"user"
  });
  return user;
};