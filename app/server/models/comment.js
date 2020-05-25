'use strict';
module.exports = (sequelize, Sequelize) => {
  const comments = sequelize.define('comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id:{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"users",
        key:'id'
      }
    },
    content_id:{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"contents",
        key:'id'
      }
    },
    comment: {
      type: Sequelize.STRING(255),
      allowNull:false,
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
    tableName:'comments'
  });
  comments.associate = function(models) {
    // associations can be defined here
    comments.belongsTo(models.contents,{
      foreignKey:'content_id'
    });
    comments.belongsTo(models.users,{
      foreignKey:'user_id'
    });
  };
  return comments;
};