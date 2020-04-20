'use strict';
module.exports = (sequelize, DataTypes) => {
  const sliders = sequelize.define('sliders', {
    display_name: DataTypes.STRING,
    url: DataTypes.STRING,
    enabled: DataTypes.INTEGER
  }, {timestamps:false});
  sliders.associate = function(models) {
    // associations can be defined here
  };
  return sliders;
};