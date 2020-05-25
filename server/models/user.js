'use strict';
module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING(20),
      allowNull:false
    },
    password:{
      type: Sequelize.CHAR(32),
      allowNull:false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    tableName:'users'
  });
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.contents,{
      foreignKey:'user_id'
    })
  };
  return users;
};