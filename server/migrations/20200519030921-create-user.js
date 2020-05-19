'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
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
    },{
      tableName:'users',
      charset:'utf8mb4',
      collate:'utf8mb4_bin'
    }).then( () => {
      return queryInterface.addIndex('users',{
        name:'username',
        unique:true,//该索引为唯一，不允许有相同用户名
        fields:['username']
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};