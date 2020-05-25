'use strict';
module.exports = (sequelize, Sequelize) => {
  const contents = sequelize.define('contents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:"users",
        key:'id'
      }
    },
    title: {
      type:Sequelize.STRING(54),
      allowNull :false
    },
    content: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    like_count :{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:0
    },
    comment_count:{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:0
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
    tableName:'contents'
  });
  contents.associate = function(models) {
    // associations can be defined here
    contents.belongsTo(models.users,{
      foreignKey:'user_id'
    });
    contents.hasMany(models.comments,{
      foreignKey:'content_id'
    });

  };
  return contents;
};