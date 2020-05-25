'use strict';
module.exports = (sequelize, Sequelize) => {
  const likes = sequelize.define('likes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    content_id: {
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"contents",
        key:'id'
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"users",
        key:'id'
      }
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
    tableName:'likes'
  });
  likes.associate = function(models) {
    // associations can be defined here
    likes.belongsTo(models.contents,{
      foreignKey:'content_id'
    });
    likes.belongsTo(models.users,{
      foreignKey:'user_id'
    });
  };
  return likes;
};