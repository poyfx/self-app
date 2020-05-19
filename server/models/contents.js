'use strict';
module.exports = (sequelize, DataTypes) => {
  const contents = sequelize.define('contents', {
    content: DataTypes.STRING
  }, {});
  contents.associate = function(models) {
    // associations can be defined here
  };
  return contents;
};