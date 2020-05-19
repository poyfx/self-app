'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    like: DataTypes.STRING
  }, {});
  like.associate = function(models) {
    // associations can be defined here
  };
  return like;
};